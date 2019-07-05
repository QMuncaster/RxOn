import '../imports/api/prescriptions.js';


// https://guide.meteor.com/accounts.html#dont-use-profile
// Don't want to use profile to store patient information
// This remove profile and flattens hierarchy by assigning properties @ root level
Accounts.onCreateUser((options, user) => {
    // options are basically the arguments to createUser
    // user is the actual user object
    user.firstname = options.profile.firstname;
    user.lastname = options.profile.lastname;
    user.address = options.profile.address;
    user.dateofbirth = options.profile.dateofbirth;
    user.phonenumber = options.profile.phonenumber;
    return user;
});


// seems like validation runs after onCreateUser
// but happens before a new user is actually created/inserted
Accounts.validateNewUser(function (user) {
    // dummy implementation for testing
    if (!user.firstname || !user.lastname || !user.address) {
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

// need to publish added account fields otherwise client cant get them
// https://docs.meteor.com/api/accounts.html#Meteor-users
Meteor.publish('userData', function () {
    if (this.userId) {
      return Meteor.users.find({ _id: this.userId }, {
        // 0 = exclude from return document
        // 1 = include in return document
        fields: { firstname: 1, lastname: 1, address: 1, dateofbirth: 1, phonenumber: 1} 
      });
    } else {
      this.ready();
    }
});
  
  