import { Images } from './images';
import { Meteor } from 'meteor/meteor';

Meteor.publish('images', function() {
   let selector = { 'meta.patientId': Meteor.userId() };
   let options = {
      fields: {},
   };
   // Note: this find is MeteorFiles find method not MongoCollection find
   return Images.find(selector, options).cursor;
});

Meteor.publish('images.all', function() {
   return Images.find().cursor;
});
