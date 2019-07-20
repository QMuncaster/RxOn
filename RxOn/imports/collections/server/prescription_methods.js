import { Meteor } from 'meteor/meteor';
import { Prescriptions } from "../prescriptions.js";

Meteor.methods({
    'prescriptions.insert'(name, strength, dose) {
      if (!this.userId) { throw new Meteor.Error('not-authorized'); }

      // TODO: validation of arguments before inserting
      // https://docs.meteor.com/api/check.html
      // https://stackoverflow.com/questions/37237023/meteor-check-vs-new-simpleschema-for-verifying-publish-arguments
      // it seems like schema already help with the validation.
      // base on the second link, we can also use schema.validate to do it but check package is well enough.

      check(name,String);
      check (strength, String);
      check(dose, String);

      Prescriptions.insert({
        patientId: this.userId,
        rxName: name,
        rxStrength: strength,
        rxDose: dose,
      });
    },

    'prescriptions.remove'(id) {
      if (!this.userId) { throw new Meteor.Error('not-authorized'); }

      var prescriptions = Prescriptions.find({_id: id}).fetch();
        // should only be able to cancel if userId matches prescription's userId
        // should only be able to cancel prescription with status = pending
      if(prescriptions.length <= 0 || this.userId !== prescriptions[0].patientId || prescriptions[0].status !== "pending") {
          { throw new Meteor.Error('you are not able to cancel')}

      }
        Prescriptions.remove(id);

    },

    // only for pharmacist users
    'prescriptions.fill'(id) {
      var loggedInUser = Meteor.user()
      if (!loggedInUser || !Roles.userIsInRole(loggedInUser, 'admin')) {
        throw new Meteor.Error(403, "Access denied")
      }

      Prescriptions.update({_id: id}, {$set: {status: "filled"}})
    },

    'prescriptions.edit'(id,name,strength,dose){
        var prescriptions = Prescriptions.find({_id: id}).fetch();
        var loggedInUser = Meteor.user();
        // console.log(prescriptions);
        // console.log(loggedInUser);
        // console.log(this.userId);
        // console.log(prescriptions[0].patientId);
        if (prescriptions.length <= 0 || !loggedInUser || (this.userId !== prescriptions[0].patientId && !Roles.userIsInRole(loggedInUser, 'admin'))) {
            throw new Meteor.Error(403, "Access denied");
        }
        check(name,String);
        check (strength, String);
        check(dose, String);
        Prescriptions.update({_id: id}, {$set: {rxName: name, rxStrength:strength, rxDose: dose}})
    },

  });
