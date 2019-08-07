import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Images } from '../../../collections/images';
import IndividualFile from '../image_upload/FileIndividualFile.js';
import Button from '@material-ui/core/Button';

class ImageUpload extends Component {
   constructor(props) {
      super(props);
      this.state = {
         uploading: [],
         progress: 0,
         inProgress: false,
      };

      this.uploadIt = this.uploadIt.bind(this);
   }

   uploadIt(e) {
      e.preventDefault();

      let self = this;

      if (e.currentTarget.files && e.currentTarget.files[0]) {
         // We upload only one file, in case
         // there was multiple files selected
         var file = e.currentTarget.files[0];

         if (file) {
            let uploadInstance = Images.insert(
               {
                  file: file,
                  meta: {
                     patientId: Meteor.userId(),
                  },
                  streams: 'dynamic',
                  chunkSize: 'dynamic',
                  allowWebWorkers: true, // If you see issues with uploads, change this to false
               },
               false
            );

            self.setState({
               uploading: uploadInstance, // Keep track of this instance to use below
               inProgress: true, // Show the progress bar now
            });

            // These are the event functions, don't need most of them, it shows where we are in the process
            uploadInstance.on('start', function() {
               console.log('Starting');
            });

            uploadInstance.on('end', function(error, fileObj) {
               console.log('On end File Object: ', fileObj);
            });

            uploadInstance.on('uploaded', function(error, fileObj) {
               console.log('uploaded: ', fileObj);

               let link = Images.findOne({ _id: fileObj._id }).link();
               self.props.setLink(link);
               // Remove the filename from the upload box
               self.refs['fileinput'].value = '';

               // Reset our state for the next file
               self.setState({
                  uploading: [],
                  progress: 0,
                  inProgress: false,
               });
            });

            uploadInstance.on('error', function(error, fileObj) {
               console.log('Error during upload: ' + error);
            });

            uploadInstance.on('progress', function(progress, fileObj) {
               console.log('Upload Percentage: ' + progress);
               // Update our progress bar
               self.setState({
                  progress: progress,
               });
            });

            uploadInstance.start(); // Must manually start the upload
         }
      }
   }

   render() {
      if (this.props.files && this.props.docsReadyYet) {
         let fileCursors = this.props.files;

         // Run through each file that the user has stored
         // (make sure the subscription only sends files owned by this user)
         let display = fileCursors.map((aFile, key) => {
            console.log('A file: ', Images.findOne({ _id: aFile._id }));
            let link = Images.findOne({ _id: aFile._id }).link(); //The "view/download" link

            // Send out components that show details of each file
            return (
               <div key={'file' + key}>
                  <IndividualFile
                     fileName={aFile.name}
                     fileUrl={link}
                     fileId={aFile._id}
                     fileSize={aFile.size}
                  />
               </div>
            );
         });

         return (
            <div>
               <div className="row">
                  <div className="col-md-12">
                     <p>Upload New File:</p>
                     <input
                        type="file"
                        id="fileinput"
                        accept="image/*"
                        disabled={this.state.inProgress}
                        ref="fileinput"
                        onChange={this.uploadIt}
                     />
                  </div>
               </div>
            </div>
         );
      } else return <div>Loading file list</div>;
   }
}

//
// This is the HOC - included in this file just for convenience, but usually kept
// in a separate file to provide separation of concerns.
//
export default withTracker(props => {
   const filesHandle = Meteor.subscribe('images');
   const docsReadyYet = filesHandle.ready();
   const files = Images.find({}, { sort: { name: 1 } }).fetch();

   return {
      docsReadyYet,
      files,
   };
})(ImageUpload);
