import { Meteor } from 'meteor/meteor';
import { Prescriptions } from '../prescriptions.js';

Meteor.methods({
    'prescriptions.insert'(
        name,
        strength,
        dose,
        firstName,
        lastName,
        refill,
        imgId,
        imgLink
    ) {
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        // https://docs.meteor.com/api/check.html
        // https://stackoverflow.com/questions/37237023/meteor-check-vs-new-simpleschema-for-verifying-publish-arguments
        // it seems like schema already help with the validation.
        // base on the second link, we can also use schema.validate to do it but check package is well enough.

        check(name, String);
        check(strength, String);
        check(dose, String);
        check(firstName, String);
        check(lastName, String);
        check(refill, Number);
        check(imgId, String);
        check(imgLink, String);

        const objectToInsert = {
            patientId: this.userId,
            rxName: name,
            rxStrength: strength,
            rxDose: dose,
            firstName: firstName,
            lastName: lastName,
            refill: refill,
            imgId: imgId,
            imgLink: imgLink,
        };
        let objectId = Prescriptions.insert(objectToInsert, function(err) {
            if (err) {
                throw new Meteor.Error(
                    'Failed to insert prescription - Please try again'
                );
            }
            // Object inserted successfully.
            let Id = objectToInsert._id; // this will return the id of object inserted
            return Id;
        });
        if (objectId) return objectId;
    },

    'prescriptions.remove'(id) {
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        var prescriptions = Prescriptions.find({ _id: id }).fetch();
        // should only be able to cancel if userId matches prescription's userId
        // should only be able to cancel prescription with status = pending
        if (
            prescriptions.length <= 0 ||
            this.userId !== prescriptions[0].patientId ||
            prescriptions[0].status !== 'pending'
        ) {
            {
                throw new Meteor.Error('you are not able to cancel');
            }
        }
        Prescriptions.remove(id);
    },

    // only for pharmacist users
    'prescriptions.fill'(id) {
        var loggedInUser = Meteor.user();
        if (!loggedInUser || !Roles.userIsInRole(loggedInUser, 'admin')) {
            throw new Meteor.Error(403, 'Access denied');
        }

        Prescriptions.update({ _id: id }, { $set: { status: 'filled' } });
    },

    'prescriptions.refill'(id) {
        var loggedInUser = Meteor.user();
        var prescriptions = Prescriptions.find({ _id: id }).fetch();

        if (!loggedInUser || !Roles.userIsInRole(loggedInUser, 'admin')) {
            throw new Meteor.Error(403, 'Access denied');
        }

        //can only refill if the status is 'filled' and there is > 0 refill tokens available
        if (
            (prescriptions[0].status === 'filled' || 'refilled') &&
            prescriptions[0].refill > 0
        ) {
            Prescriptions.update(
                { _id: id },
                { $set: { refill: prescriptions[0].refill - 1, status: 'refilled' } }
            );
        }
    },

    'prescriptions.edit'(id, name, strength, dose, refill) {
        var prescriptions = Prescriptions.find({ _id: id }).fetch();
        var loggedInUser = Meteor.user();

        if (
            prescriptions.length <= 0 ||
            !loggedInUser ||
            (this.userId !== prescriptions[0].patientId &&
                !Roles.userIsInRole(loggedInUser, 'admin')) ||
            prescriptions[0].status !== 'pending'
        ) {
            throw new Meteor.Error(403, 'Access denied');
        }
        check(name, String);
        check(strength, String);
        check(dose, String);
        check(refill, Number);
        
        Prescriptions.update(
            { _id: id },
            { $set: { rxName: name, rxStrength: strength, rxDose: dose, refill: refill } }
        );
    },
});
