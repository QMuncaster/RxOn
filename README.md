# RxOn
### This branch is for updating db schema
Schema is as follows
```javascript
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
```
### Notes about connecting to Atlas
Meteor uses enviroment variables that one can provide to the application.
The variable of inter here is called MONGO_URL. We set this to our database connecting url string.
We can do this in command line, but we would have to do the following each time we run meteor
```
export MONGO_URL=connetingUrlString
meteor
```
I looked online and there is no way to set these during development. They are meant to be set in deployment enviroment.
This leaves us with two solutions: 
* Have a bash script that runs the commands and then point ```start scripts``` to this bash script
* Or just put the commands in package.json directly. Which what I did although very bad practice, it will make it easy for us to work together on it. Of course someone can tinker with our db but we are kids running a no-name project :D. This is jsut a temporary solution for the time being.

Here are some links
[Config MONGOURL](https://forums.meteor.com/t/how-to-config-monogo-url-on-setting-js/33178)
[Similar to above](https://forums.meteor.com/t/what-are-all-the-meteor-settings-json-options/8573)

### Meteor and MongoDB notes for quick reference
 Create a collection on the server within MongoDB, and an interface to that collection to be used on the server. 
 It’s a fairly straightforward layer on top of the underlying Node MongoDB driver, but with a __synchronous API__


 on the client, a collection is a client side cache of the database.  This achieved thanks to Minimongo


 Subscribing to a publication pushes data from the server to the client.
 subscription “bridges” a server-side MongoDB collection, and the client side Minimongo cache of that collection. You can think of a subscription as a pipe that connects a subset of the “real” collection with the client’s version, and constantly keeps it up to date with the latest information on the server.

 The key thing to realize is that DDP sends changes to documents at the level of top-level document fields. 
 What this means is that if you have large and complex subfields on document that change often, DDP can send unnecessary changes over the wire.

 For instance, in “pure” MongoDB you might design the schema so that each list document had a field called todos which was an array of todo items:

```javascript
Lists.schema = new SimpleSchema({
  name: {type: String},
  todos: {type: [Object]}
});
```

The issue with this schema is that due to the DDP behavior just mentioned, each change to any todo item in a list will require sending the entire set of todos for that list over the network. This is because DDP has no concept of “change the text field of the 3rd item in the field called todos“. It can only “change the field called todos to a totally new array”.