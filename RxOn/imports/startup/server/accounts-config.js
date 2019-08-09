import { Roles } from 'meteor/alanning:roles';

const defaultRoles = ['patient'];

// https://guide.meteor.com/accounts.html#dont-use-profile
// Don't want to use profile to store patient information
// This remove profile and flattens hierarchy by assigning properties @ root level
Accounts.onCreateUser((options, user) => {
    // options are basically the arguments to createUser
    // user is the actual user object
    Roles.addUsersToRoles(user._id, 'patient');
    user.firstname = options.profile.firstname;
    user.lastname = options.profile.lastname;
    user.sex = options.profile.sex;
    user.age = options.profile.age;
    user.address = options.profile.address;

    user.roles = defaultRoles;
    return user;
});


// seems like validation runs after onCreateUser
// but happens before a new user is actually created/inserted
Accounts.validateNewUser(function (user) {
    // dummy implementation for testing
    if (!user.firstname || !user.lastname || !user.age || !user.sex || !user.address) {
        throw new Meteor.Error(403, 'All fields are required');
    }
    return true;
});


// Deny all client-side updates to user documents
// MAY NEED TO UNDO THIS WHEN WE IMPLEMENT UPDATING USER INFO
// https://guide.meteor.com/accounts.html#dont-use-profile
Meteor.users.deny({
    update() { return true; }
});