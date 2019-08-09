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


// need to publish added account fields otherwise client cant get them
// https://docs.meteor.com/api/accounts.html#Meteor-users
Meteor.publish('userData', function () {
    if (this.userId) {
      return Meteor.users.find({ _id: this.userId }, {
        // 0 = exclude from return document
        // 1 = include in return document
        fields: {_id: 1, firstname: 1, lastname: 1, sex: 1, age :1 , address: 1, email: 1, roles: 1}
      });
    } else {
      this.ready();
    }
});

Meteor.publish('userList', function () {
  if (Roles.userIsInRole(this.userId, ['admin'])) {
    return Meteor.users.find({}, {
      sort: {lastname: 1},
      fields: { _id: 1, firstname: 1, lastname: 1, sex: 1, age:1, address: 1, email: 1, roles: 1}});
  } else {
    // unauthorized, do not publish data
    this.stop();
    return;
  }
});
