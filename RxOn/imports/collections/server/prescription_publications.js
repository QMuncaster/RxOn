import { Meteor } from 'meteor/meteor';
import { Prescriptions } from "../prescriptions.js";

// don't need to use Meteor.isServer because file is in a server directory
// any code in /server directory won't be loaded on the client
// this could be better if we want to hide our role-based security checks from client

// anyone can subscribe
Meteor.publish('prescriptions', function () {
  return Prescriptions.find({ patientId: Meteor.userId() },
    { fields: {} }); // private fields to exclude will be specified here with value 0
});

// only for pharmacist users
Meteor.publish('prescriptions.all', function () {
  if (Roles.userIsInRole(this.userId, ['admin'])) {
    return Prescriptions.find({});
  } else {
    // unauthorized, do not publish data
    this.stop();
    return;
  }
});
