import { Images } from './images';
import { Meteor } from 'meteor/meteor';

Meteor.methods({
    'images.RemoveFile'(id) {
        Images.remove({ _id: id }, function(error) {
            if (error) {
                console.error("File wasn't removed, error: " + error.reason);
            } else {
                console.info('File successfully removed');
            }
        });
    },
});
