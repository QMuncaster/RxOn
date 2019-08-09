import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { Random } from 'meteor/random';
import { FilesCollection } from 'meteor/ostrio:files';
import stream from 'stream';
import S3 from 'aws-sdk/clients/s3';
import fs from 'fs';

/* access S3 config and keys from settings.json */
const s3Config = Meteor.settings.s3 || {};
const bound = Meteor.bindEnvironment(callback => {
    return callback();
});

/* Check settings existence in `Meteor.settings` */
if (s3Config && s3Config.key && s3Config.secret && s3Config.bucket && s3Config.region) {
    console.log('in image config file');
    // Create a new S3 object
    const s3 = new S3({
        secretAccessKey: s3Config.secret,
        accessKeyId: s3Config.key,
        region: s3Config.region,
        httpOptions: {
            timeout: 6000,
            agent: false,
        },
    });

    // Declare the Meteor file collection on the Server
    export const Images = new FilesCollection({
        debug: false,
        storagePath: 'assets/app/uploads/uploadedFiles',
        collectionName: 'Images',
        // Disallow Client to execute remove, use the Meteor.method
        allowClientCode: false,

        // Start moving files to AWS
        // after fully received by the Meteor server
        onAfterUpload(fileRef) {
            // Run through each of the uploaded file
            _.each(fileRef.versions, (vRef, version) => {
                // Random.id() is used instead of real _id
                // to secure files from reverse engineering on the AWS client
                const filePath =
                    'files/' + Random.id() + '-' + version + '.' + fileRef.extension;
                s3.putObject(
                    {
                        StorageClass: 'STANDARD',
                        Bucket: s3Config.bucket,
                        Key: filePath,
                        Body: fs.createReadStream(vRef.path),
                        ContentType: vRef.type,
                    },
                    error => {
                        bound(() => {
                            if (error) {
                                console.error(error);
                            } else {
                                // Update FilesCollection with link to the file at AWS
                                const upd = { $set: {} };
                                upd['$set'][
                                    'versions.' + version + '.meta.pipePath'
                                ] = filePath;

                                this.collection.update(
                                    {
                                        _id: fileRef._id,
                                    },
                                    upd,
                                    updError => {
                                        if (updError) {
                                            console.error(updError);
                                        } else {
                                            /* Unlink original files from FS after successful upload to AWS */
                                            this.unlink(
                                                this.collection.findOne(fileRef._id),
                                                version
                                            );
                                        }
                                    }
                                );
                            }
                        });
                    }
                );
            });
        },

        /* Intercept access to the file redirect request to AWS */
        interceptDownload(http, fileRef, version) {
            let path;

            if (
                fileRef &&
                fileRef.versions &&
                fileRef.versions[version] &&
                fileRef.versions[version].meta &&
                fileRef.versions[version].meta.pipePath
            ) {
                path = fileRef.versions[version].meta.pipePath;
            }

            /* If file is successfully moved to AWS:S3 pipe request to AWS
            this way the original link will stay always secure */
            if (path) {
                const opts = {
                    Bucket: s3Config.bucket,
                    Key: path,
                };

                if (http.request.headers.range) {
                    const vRef = fileRef.versions[version];
                    let range = _.clone(http.request.headers.range);
                    const array = range.split(/bytes=([0-9]*)-([0-9]*)/);
                    const start = parseInt(array[1]);
                    let end = parseInt(array[2]);
                    if (isNaN(end)) {
                        end = start + this.chunkSize - 1;
                        if (end >= vRef.size) {
                            end = vRef.size - 1;
                        }
                    }
                    opts.Range = `bytes=${start}-${end}`;
                    http.request.headers.range = `bytes=${start}-${end}`;
                }

                const fileColl = this;
                s3.getObject(opts, function(error) {
                    if (error) {
                        console.error(error);
                        if (!http.response.finished) {
                            http.response.end();
                        }
                    } else {
                        if (
                            http.request.headers.range &&
                            this.httpResponse.headers['content-range']
                        ) {
                            /* Set proper range header in according to what is returned from AWS:S3 */
                            http.request.headers.range = this.httpResponse.headers[
                                'content-range'
                            ]
                                .split('/')[0]
                                .replace('bytes ', 'bytes=');
                        }

                        const dataStream = new stream.PassThrough();
                        fileColl.serve(
                            http,
                            fileRef,
                            fileRef.versions[version],
                            version,
                            dataStream
                        );
                        dataStream.end(this.data.Body);
                    }
                });

                return true;
            }
            /* Serve file from FS While file is not yet uploaded to AWS */
            return false;
        },
    });

    /* Intercept remove method to remove file from AWS:S3 */
    const _origRemove = Images.remove;
    Images.remove = function(search) {
        const cursor = this.collection.find(search);
        cursor.forEach(fileRef => {
            _.each(fileRef.versions, vRef => {
                if (vRef && vRef.meta && vRef.meta.pipePath) {
                    /* Remove the object from AWS first, 
                    then call the original FilesCollection remove */
                    s3.deleteObject(
                        {
                            Bucket: s3Config.bucket,
                            Key: vRef.meta.pipePath,
                        },
                        error => {
                            bound(() => {
                                if (error) {
                                    console.error(error);
                                }
                            });
                        }
                    );
                }
            });
        });

        /* Remove original file record from database */
        _origRemove.call(this, search);
    };
} else {
    throw new Meteor.Error(401, 'Missing Meteor file settings');
}
