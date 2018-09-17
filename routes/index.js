const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const Student = require('../models/Student');

const registerController = require('../controllers/registerController');
const loginController = require('../controllers/loginController');

//Home Page
router.get('/', (req, res, next) => {
  res.render('index');
});

//Register Form
router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', registerController.register);

//Login routes
router.get('/login', (req, res) => {
  res.render('login')
});

// loginController.login
router.post('/login', passport.authenticate('local'),
  function (req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.redirect('/mainpage/' + req.user.studentID);
  });

//Logout Route
router.get('/logout', loginController.logout);

router.get('/mainpage/:id', (req, res, next) => {
  const id = req.params.id;
  res.render('mainpage', {
    id
  });
});

module.exports = router;