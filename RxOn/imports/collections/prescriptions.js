import { Meteor } from 'meteor/meteor';
import { Mongo } from "meteor/mongo";
import SimpleSchema from 'simpl-schema';

export const Prescriptions = new Mongo.Collection("prescriptions");

// by default all fields are required. need to specify if optional
const PrescriptionsSchema = new SimpleSchema({
  _id: String,
  patientId: {
    type: String,
    defaultValue: "fake1234"
  },
  pharmacyId: {
    type: String,
    defaultValue: "fake1234"
  },
  //userName: String,
  rxName: String,
  rxDose: String,
  rxStrength: String,
  status: {
    type: String,
    allowedValues: ["pending", "filled", "complete", "canceled"],
    defaultValue: "pending"
  },
  createdAt: {
    type: Date,
    // Force value to be current date (on server) upon insert
    // and prevent updates thereafter.
    autoValue: function () {
      if (this.isInsert) {
        return new Date();
      } else if (this.isUpsert) {
        return { $setOnInsert: new Date() };
      } else {
        this.unset(); // Prevent user from supplying their own value
      }
    }
  },
  updatedAt: {
    type: Date,
    autoValue: function () {
      if (this.isUpdate) {
        return new Date();
      }
    },
    optional: true
  }
});

// apparently this is better to have in a file that only runs server side
// not sure how to set that up though, when I move to main.js then Prescriptions is not defined
if (Meteor.isServer) {
  // anyone can subscribe
  Meteor.publish('prescriptions', function () {
    return Prescriptions.find({ patientId: Meteor.userId() },
      { fields: { } }); // private fields to exclude will be specified here with value 0
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
}

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

Prescriptions.attachSchema(PrescriptionsSchema);
