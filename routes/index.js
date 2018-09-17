const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const Student = require('../models/Student');

// const registerController = require('../controllers/registerController');

//Home Page
router.get('/', (req, res, next) => {
  res.render('index');
});

//Register Form
router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', (req, res) => {

  //Express Validator
  // req.checkBody('firstName', 'First Name is required').notEmpty();
  //const errors = req.validationErrors();
  //if errors  - - else --

  var newStudent =  new Student({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    address: req.body.address,
    email: req.body.email,
    studentID: req.body.studentID,
    password: req.body.password,
    password2: req.body.password2,
    phoneNumber: req.body.phoneNumber,
    stdYear: req.body.stdYear,
    stdSemester: req.body.stdSemester
  });

  var errors = [];
  if(req.body.password != req.body.password2){
    errors.push('Password do not match!!');
  }

  if(req.body.password.length < 4 ){
    errors.push('Password must be at least 4 characters long!!');
  }

//Passing errors and all field value so that we dont have to re-enter anything
  if(errors.length > 0) {
    res.render('register', {
      errors: errors
    });
  } else {
    //Save that User to Database
    Student.findOne({studentID: req.body.studentID})
      .then(user => {
        if(user){
          req.flash('error_msg', 'Student ID Already exits, login instead!');
          res.redirect('/register');
        } else {
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newStudent.password, salt, (err, hash) => {
              if(err) throw err;
              newStudent.password = hash;
              newStudent.save()
                .then(user => {
                req.flash('success_msg', 'You are now registered and can login now');
                res.redirect('/register');
              }).catch(err => {
                console.log(err);
                return;
              });
            })
          });
        }
      });
}


});

//Login routes
router.get('/login', (req, res) => {
  res.render('login')
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
      successRedirect: '/mainpage',
      failureRedirect: '/login',
      failureFlase: true
    })(req, res, next);
});

router.get('/mainpage', (req, res, next) => {
  res.render('mainpage');
});

module.exports = router;
