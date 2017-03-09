/*
#######################################################################################
The name of source file : contacts.js
The information of author :  Giho Kim
The student number: 300738697
Web App name: Assignment2
#######################################################################################
*/

// import  the mongoose npm package
let mongoose = require('mongoose');

// create a model class
let contactsSchema = mongoose.Schema({
    name: String,
    number: Number,
    email: String
},
{
  collection: "contact"
});

module.exports = mongoose.model('contacts', contactsSchema);
