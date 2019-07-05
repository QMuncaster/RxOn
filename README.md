# RxOn
### This branch is for updating db schema
Schema is as follows
{
    ListOFPrescriptions [
        {
            _id: mongo default generated id
            userID: this corresponds to the user id created by accounts
            name: First and Last names of Patient
            Prescription: {name, dose, strength}
            Status: {shipped, pending, canceled, ready for pick up, out of stock, Complete}
            createdAt: mongodb default
            updatedAt: mongodb default
        },
        {
            another object like above
        },
        ...
    ]
}