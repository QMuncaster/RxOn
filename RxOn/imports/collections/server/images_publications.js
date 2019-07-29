import { Images } from './images';
import { Meteor } from 'meteor/meteor';

Meteor.publish('files.all', function() {
    return Images.find().cursor;
});
