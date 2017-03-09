/*
#######################################################################################
The name of source file : contacts.js
The information of author :  Giho Kim
The student number: 300738697
Web App name: Assignment2
#######################################################################################
*/

// import the express object
let express = require('express');
// create the router for our application
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

// define the user model
let UserModel = require('../models/users');
let User = UserModel.User; // alias for User


// create the contact object - represents a document in the
// contacts collection
let contact = require('../models/contacts');

// function to check if the user is authenticated
function requireAuth(req, res, next) {
  // check if the user is logged index
  if(!req.isAuthenticated()) {
    return res.redirect('/login');
  }
  next();
}

/* GET main contacts page. */
router.get('/', requireAuth, (req, res, next) => {
  // find all contacts in the contacts collection
  contact.find((err, contacts) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('contacts/index', {
        title: 'Contacts',
        contacts: contacts,
        displayName: req.user ? req.user.displayName : ''
      });
    }
  });
});

// GET add page - show the blank details page
router.get('/add', requireAuth, (req, res, next) => {
    res.render('contacts/details', {
      title: 'Add a new Contact',
      contacts: '',
      displayName: req.user ? req.user.displayName : ''
    });
});

// POST add page - save the contact to the db
router.post('/add', requireAuth,(req, res, next) => {
    contact.create({
      "name": req.body.name,
      "number": req.body.number,
      "email": req.body.email
    }, (err, contact) => {
      if(err) {
        console.log(err);
        res.end(err);
      } else {
        res.redirect('/contacts');
      }
    });
});

/* GET edit - show current contact to edit */
router.get('/:id', requireAuth, (req, res, next) => {

  // get a reference to the id of the contact to edit
  let id = req.params.id;

  // find the contact to edit by it's id in the contacts collection
  contact.findById(id, (err, contacts) => {

    if (err) {
      console.error(err);
      res.end(error);
    }
    else {
      // show the edit view
      res.render('contacts/details', {
        title: 'Contact Details',
        contacts: contacts,
        displayName: req.user ? req.user.displayName : ''
      });
    }
  });
});

/* POST edit - process the contact to edit */
router.post('/:id',requireAuth ,(req, res, next) => {

  // get a reference to the id of the contact to edit
  let id = req.params.id;
  // create a new contact object to hold the changes
  let contacts = new contact({
    "_id": id,
    "name": req.body.name,
    "number": req.body.number,
    "email": req.body.email
  });

  contact.update({ _id: id}, contacts, (err) => {
    if(err) {
      console.log(err);
      res.end(error);
    }
    else {
      // refresh the contact list
      res.redirect('/contacts');
    }
  });

});

//GET delete - should delete by id
router.get('/delete/:id',requireAuth, (req, res, next) => {

  // get a reference to the id of the contact to edit
  let id = req.params.id;

  contact.remove({_id: id}, (err) => {
    if(err) {
      console.log(err);
      res.end(err);
    }
    else {
      res.redirect('/contacts');
    }
  });

});




module.exports = router;
