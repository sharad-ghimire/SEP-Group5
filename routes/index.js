const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

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

  var errors = [];
  if(req.body.password != req.body.password2){
    errors.push({
      text: 'Password do not match!!'
    });
  }

  if(req.body.password.length < 4 ){
    errors.push({
      text: 'Password must be at least 4 characters long!!'
    });
  }

//Passing errors and all field value so that we dont have to re-enter anything
  if(errors.length > 0) {
    console.log(errors);
    res.render('register', {
      error: errors,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      address: req.body.address,
      email: req.body.email,
      id: req.body.id,
      password: req.body.password,
      password2: req.body.password2,
      phoneNumber: req.body.phoneNumber,
      stdYear: req.body.stdYear,
      stdSemester: req.body.stdSemester
    });
  }

  // const newUser = {
  //   firstName: req.body.firstName,
  //   lastName: req.body.lastName,
  //   address: req.body.address,
  //   email: req.body.email,
  //   phoneNumber: req.body.phoneNumber,
  //   stdSemester: req.body.stdSemester
  // }
  // new Student(newUser).save().then(user => {
  //   res.redirect('/mainpage', {
  //     user
  //   });
  // });

  res.send("Register");
  console.log(req.body);
});

//Login routes
router.get('/login', (req, res) => {
  res.render('login')
});

router.get('/mainpage', (req, res, next) => {
  res.render('mainpage');
});

module.exports = router;
