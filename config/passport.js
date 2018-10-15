/**
 * Passport module for configuration of authentication
 */
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// User Model
const User = require('../models/user');


module.exports = (passport) => {

  //Local Strategy for login
  passport.use(new LocalStrategy({
    usernameField: 'stdId'
  }, (stdId, password, done) => {
    //Match User
    User.findOne({
      stdId: stdId
    }).then(user => {
      if (!user) {
        return done(null, false, {
          message: 'No User Found!'
        });
      }
      //Match password
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, {
            message: 'Password or ID Incorrect!'
          });
        }
      });
    });
  }));

  //Serialize user
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  //Deserailize user
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });

}