import { Meteor } from 'meteor/meteor';
import { Prescriptions } from "../prescriptions.js";

Meteor.methods({
    'prescriptions.insert'(name, strength, dose) {
      if (!this.userId) { throw new Meteor.Error('not-authorized'); }
  
      // TODO: validation of arguments before inserting
      Prescriptions.insert({
        patientId: this.userId,
        rxName: name,
        rxStrength: strength,
        rxDose: dose,
      });
    },
  
    'prescriptions.remove'(id) {
      if (!this.userId) { throw new Meteor.Error('not-authorized'); }
  
      // TODO:
      // should only be able to cancel if userId matches prescription's userId
      // should only be able to cancel prescription with status = pending
      Prescriptions.remove(id);
    },
  
    // only for pharmacist users
    'prescriptions.fill'(id) {
      var loggedInUser = Meteor.user()
      if (!loggedInUser || !Roles.userIsInRole(loggedInUser, 'admin')) {
        throw new Meteor.Error(403, "Access denied")
      }
  
      Prescriptions.update({_id: id}, {$set: {status: "filled"}})
    }
  });
  