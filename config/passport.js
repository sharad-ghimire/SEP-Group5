const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

//Load Student Model
const Student = require('../models/Student');

module.exports = (passport) => {

  //Since we are using studentID as our username - so we have to specify {usernameField: 'studentID'}
  passport.use(new LocalStrategy({
    usernameField: 'studentID'
  }, (studentID, password, done) => {
    //Check for user
    Student.findOne({
      studentID: studentID
    }).then(student => {
      if (!student) {
        return done(null, false, {
          message: 'No User Found'
        })
      }

      //match password using bcrypt
      bcrypt.compare(password, student.password, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
          return done(null, student);

        } else {
          // console.log("Password not match");
          return done(null, false, {
            message: 'Password Incorrect'
          })

        }
      })
    }).catch(err => console.log(err));
  }));

  //Serialize  Students
  passport.serializeUser((student, done) => {
    done(null, student.id);
  });

  passport.deserializeUser((id, done) => {
    Student.findById(id, (err, student) => {
      done(err, student);
    });
  });
}