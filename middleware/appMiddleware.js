const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
// const session = require('express-session');
const passport = require('passport');
const cookieSession = require('cookie-session');
const path = require('path');
const config = require('../config/config');
const express = require('express');

//Setting up global middlewares
module.exports = (app) => {
  //Body parser Middle ware //deals with forms data
  app.use(bodyParser.urlencoded({
    extended: false
  }));
  app.use(bodyParser.json());

  //Middleware for Cookie Session
  app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [config.session.cookieKey]
  }));

  //Passport Middleware
  app.use(passport.initialize());
  app.use(passport.session());
  //passport Config
  require('../config/passport')(passport);

  //Express messages
  app.use(require('connect-flash')());
  app.use((req, res, next) => {
    res.locals.messages = require('express-messages')(req, res);
    next();
  });

  //Express Validator -- From githib documentation [error formatter]
  app.use(
    expressValidator({
      errorFormatter: (param, msg, value) => {
        var namespace = param.split('.'),
          root = namespace.shift(),
          formParam = root;

        while (namespace.length) {
          formParam += '[' + namespace.shift() + ']';
        }
        return {
          param: formParam,
          msg: msg,
          value: value
        };
      }
    })
  );

  //seting static assests folder
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));


  //Global variables
  app.use((req, res, next) => {
    res.locals.errors = null;
    // res.locals.error = req.flash('error');
    // res.locals.success_msg = req.flash('success_msg');
    res.locals.user = req.user || null;
    console.log(req.user);
    // res.locals.student = req.student || null;
    next();
  });
}