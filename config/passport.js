const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const passport = require('passport');


require('./strategies/local.strategy');

//Load Student Model
const Student = require('../models/Student');

module.exports = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());

  //Stores the user to session
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  //Retrive user from session
  passport.deserializeUser((user, done) => {
    done(null, user);
  });

}