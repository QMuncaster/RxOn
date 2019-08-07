import { Meteor } from 'meteor/meteor';

Meteor.methods({
    'account.edit'(firstname, lastname, sex, address) {
        let loggedInUser = Meteor.user();
        if (!loggedInUser) {
            throw new Meteor.Error(403, 'Access denied');
        }
        if (!firstname || !lastname || !sex || !address) {
            throw new Meteor.Error(403, 'All fields are required');
        }
        Meteor.users.update({_id: loggedInUser._id}, {$set: {firstname, lastname, sex, address}});
    },
});
