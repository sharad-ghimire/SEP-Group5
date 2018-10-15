const express = require('express');
const router = express.Router();
const passport = require('passport');

const bcrypt = require('bcryptjs');



let User = require('../models/user');
let students = require('../data/students')
let Student = require('../models/student');


//Home Page
router.get('/', (req, res, next) => {
  res.render('index');
});

//Login Route
router.get('/login', (req, res, next) => {
  res.render('login');
});

//Register Route
router.get('/register', (req, res, next) => {
  res.render('register');
});




router.post('/register', (req, res, next) => {
  const name = req.body.name;
  const stdId = req.body.stdId;
  const password = req.body.password;
  const password2 = req.body.password2;
  const doctor = (req.body.isDoctor == '1') ? true : false; 
  console.log(doctor);
  

  req.checkBody('name', 'Name field is required').notEmpty();
  req.checkBody('stdId', 'ID field is required').notEmpty();
  req.checkBody('password', 'Password field is required').notEmpty();
  req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

  let errors = req.validationErrors();
  if (errors) {
    res.render('register', {
      errors: errors
    })
  } else {
    User.findOne({
      stdId: req.body.stdId
    }).then(user => {
      if (user) {
        req.flash('error_msg', 'Student Id already exists');
        res.redirect('/register');
      } else {
        const newUser = new User({
          name: name,
          stdId: stdId,
          password: password,
          doctor: doctor
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save().then(user => {
                req.flash('sucess_msg', 'You are now registered pal!');
                res.redirect('/login');
              })
              .catch(err => {
                console.log(err);
                return;
              });
          });
        });
      }
    })
  }
});


//Login Processing route
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/users/profile',
    failureRedirect: '/login',
    failureFlash: true
  })(req, res, next);
});

router.get('/logout', (req, res, next) => {
  req.logout();
  req.flash('sucess_msg', 'You are now logged out!');
  res.redirect('/login');
});

//AJAX routes
// router.post("/dates", (req, res) => {
//   var obj = {};
//   console.log(req.body.date);
//   var dates = require("../data/availability.json");
//   console.log(dates['dates']);
//   res.json(dates);
// });

module.exports = router;