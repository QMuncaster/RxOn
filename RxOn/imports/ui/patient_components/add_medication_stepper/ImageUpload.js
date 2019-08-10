import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Images } from '../../../collections/images';
import { DropzoneArea } from 'material-ui-dropzone';
import { withStyles } from '@material-ui/core/styles';
import { withTracker } from 'meteor/react-meteor-data';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import '../../styling/ImageUpload.css';

function Progress() {
    return (
        <CircularProgress
            size={24}
            style={{ marginLeft: 15, position: 'relative', top: 4 }}
        />
    );
}

const styles = () => ({
    root: {
        backgroundColor: '#fff',
        borderRadius: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        fontFamily: 'Roboto',
    },
    inline: {
        display: 'inline',
    },
});

class ImageUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inProgress: false,
            uploadedFile: {
                id: '',
                isNull: true,
            },
        };
        this.handleUpload = this.handleUpload.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleUpload(files) {
        let uploadInstance = Images.insert(
            {
                file: files,
                meta: {
                    patientId: Meteor.userId(),
                },
                streams: 'dynamic',
                chunkSize: 'dynamic',
                // change this to false if there are any issues with upload
                allowWebWorkers: true,
            },
            false
        );
        this.setState({
            inProgress: true,
        });

        uploadInstance.on('uploaded', function(error, fileRef) {
            self.setState({
                inProgress: false,
            });
        });

        let self = this;
        uploadInstance.on('end', function(error, fileRef) {
            if (!error) {
                let id = fileRef._id;
                let link = Images.findOne({ _id: id }).link();
                self.props.setLink(link);
                self.props.setId(id);
                self.setState({
                    uploadedFile: {
                        id: id,
                        isNull: false,
                    },
                });
            }
        });

        uploadInstance.start();
    }

    handleDelete() {
        let id = this.state.uploadedFile.id;
        Meteor.call('images.RemoveFile', id);
        this.props.setLink('');
        this.props.setId('');
        this.setState({
            uploadedFile: {
                id: '',
                isNull: true,
            },
        });
    }

    render() {
        const { classes } = this.props;
        const { inProgress } = this.state;
        return (
            <React.Fragment>
                <Typography variant="body1" className={classes.inline}>
                    Please upload an image of your prescription
                </Typography>
                <div className={classes.inline}>{inProgress && <Progress />}</div>
                <br />
                <DropzoneArea
                    onDelete={this.handleDelete}
                    onDrop={this.handleUpload}
                    showPreviews={false}
                    showPreviewsInDropzone={true}
                    dropzoneClass={classes.root}
                    acceptedFiles={['image/*']}
                    filesLimit={1}
                    maxFileSize={5000000}
                />
            </React.Fragment>
        );
    }
}

const styledImageUpload = withStyles(styles)(ImageUpload);
export default withTracker(() => {
    const filesHandle = Meteor.subscribe('images');
    const docsReadyYet = filesHandle.ready();
    return {
        docsReadyYet,
    };
})(styledImageUpload);
