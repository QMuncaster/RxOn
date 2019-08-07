import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { DropzoneArea } from 'material-ui-dropzone';
import { withStyles } from '@material-ui/core/styles';
import { withTracker } from 'meteor/react-meteor-data';
//import { Tracker } from 'meteor/tracker';
import { Images } from '../../../collections/images';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import './dz.css';

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

class DropzoneAreaExample extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // files: {},
            // progress: 0,
            inProgress: false,
            uploadedFile: {
                id: '',
                isNull: true,
            },
        };
        this.handleUpload = this.handleUpload.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    // Not sure how to obtain latest file to maintain state between navigation of dialog
    // componentDidMount() {
    //    let self = this;
    //    const filesHandle = Meteor.subscribe('images');
    //    Tracker.autorun(() => {
    //       if (filesHandle.ready()) {
    //          console.log('docs are ready in dz');
    //          console.log('image in props: ', self.props.files);
    //          self.setState((state, props) => {
    //             console.log('props set state: ', props);
    //             return {
    //                files: props.files[0],
    //             };
    //          });
    //       }
    //    });
    // }

    handleUpload(files) {
        // this.setState({
        //    files: files,
        // });
        let uploadInstance = Images.insert(
            {
                file: files,
                meta: {
                    patientId: Meteor.userId(), // Optional, used to check on server for file tampering
                },
                streams: 'dynamic',
                chunkSize: 'dynamic',
                allowWebWorkers: true, // If you see issues with uploads, change this to false
            },
            false
        );
        this.setState({
            inProgress: true,
        });

        let self = this;
        uploadInstance.on('uploaded', function(error, fileObj) {
            console.log('uploaded file: ', fileObj);
            let id = fileObj._id;
            let link = Images.findOne({ _id: id }).link();
            self.props.setLink(link);
            self.props.setId(id);
            self.setState({
                inProgress: false,
                uploadedFile: {
                    id: id,
                    isNull: false,
                },
            });
        });

        uploadInstance.on('error', function(error, fileObj) {
            console.log('Error during upload: ' + error);
        });

        uploadInstance.start();
    }

    handleDelete() {
        let conf = confirm('Are you sure you want to delete the file?') || false;
        if (conf == true) {
            Meteor.call('images.RemoveFile', this.state.uploadedFile.id, function(
                err,
                res
            ) {
                if (err) console.log(err);
            });
        }
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

const styledDropZone = withStyles(styles)(DropzoneAreaExample);
//export default styledDropZone;
export default withTracker(() => {
    const filesHandle = Meteor.subscribe('images');
    const docsReadyYet = filesHandle.ready();
    //const files = Images.find({}, { sort: { name: 1 } }).fetch();
    return {
        docsReadyYet,
        //files,
    };
})(styledDropZone);
