import { Mongo } from "meteor/mongo";
import SimpleSchema from 'simpl-schema'

export const Prescriptions = new Mongo.Collection("prescriptions");
// by default all fields are required. need to specify if optional
const PrescriptionsSchema = new SimpleSchema({
  _id: String,
  // userId: {
  //   type: String,
  //   autoValue: function() {
  //     return this.userId;
  //   }
  // },
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
