/*
#######################################################################################
The name of source file : index.js
The information of author :  Giho Kim #300738697
Last Modified by: Giho Kim
Last Modified date: 07-Feb-2017
Program Description: this page is to locate web page using router.
Revision History: 1.0
#######################################################################################
*/

let express = require('express');
let router = express.Router();

// import mongoose NPM package
let mongoose = require('mongoose');

// create the game object - represents a document in the
// contacts collection
let game = require('../models/contacts');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('content/index', { title: 'Home' });
});

/* GET about page. */
router.get('/about', (req, res, next) => {
  res.render('content/about', { title: 'About' });
});

/* GET project page. */
router.get('/projects', (req, res, next) => {
  res.render('content/projects', { title: 'Projects' });
});

/* GET service page. */
router.get('/services', (req, res, next) => {
  res.render('content/services', { title: 'Services' });
});

module.exports = router;
