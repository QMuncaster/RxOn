import { Roles } from 'meteor/alanning:roles';

const defaultRoles = ['patient'];

Accounts.onCreateUser((options, user) => {
    Roles.addUsersToRoles(user._id, 'patient');
    user.firstname = options.profile.firstname;
    user.lastname = options.profile.lastname;
    user.sex = options.profile.sex;
    user.age = options.profile.age;
    user.address = options.profile.address;

    user.roles = defaultRoles;
    return user;
});

Accounts.validateNewUser(function (user) {
    if (!user.firstname || !user.lastname || !user.age || !user.sex || !user.address) {
        throw new Meteor.Error(403, 'All fields are required');
    }
    return true;
});

Meteor.users.deny({
    update() { return true; }
});