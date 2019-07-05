import { Mongo } from "meteor/mongo";
import SimpleSchema from 'simpl-schema'

const Prescriptions = new Mongo.Collection("prescriptions");
// by default all fields are required. need to specify if optional
const PrescriptionsSchema = new SimpleSchema({
  _ID: {
    type: String,
    autoValue: function() {
      return this.docId;
    }
  },
  userID: {
    type: String,
    autoValue: function() {
      return this.userId;
    }
  },
  name: String,
  rxName: String,
  rxDose: String,
  rxStrength: String,
  status: {
    type: String,
    allowedValues: ["pending", "shipped", "complete", "canceled"],
    defaultValue: "pending"
  },
  createdAt: {
    type: Date,
    // Force value to be current date (on server) upon insert
    // and prevent updates thereafter.
    autoValue: function() {
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
    autoValue: function() {
      if (this.isUpdate) {
        return new Date();
      }
    },
    optional: true
  }
});

Prescriptions.attachSchema( PrescriptionsSchema );

export default Prescriptions;