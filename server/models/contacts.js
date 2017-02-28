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
