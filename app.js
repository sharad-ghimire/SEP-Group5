const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');

const port = 3000;
// routers TODO
const index = require('./routes/index');
const users = require('./routes/users');

//Passport Congig
require('./config/passport')(passport);


const app = express();

//View Engine
// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Body Parser 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

//Express Session
app.use(session({
  secret: 'whatever',
  saveUninitialized: true,
  resave: true
}));

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Express Messgaes
app.use(flash());

//Express Validator
app.use(expressValidator({
  errorFormatter: (param, msg, value) => {
    var namespace = param.split('.');
    var root = namespace.shift();
    var formParam = root;

    while (namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param: formParam,
      msg: msg,
      value: value
    };
  }
}));

//Local varaibles
app.use((req, res, next) => {
  res.locals.errors = null;
  res.locals.sucess_msg = req.flash('sucess_msg') || null;
  res.locals.error_msg = req.flash('error_msg') || null;
  res.locals.error = req.flash('error') || null;
  res.locals.user = req.user || null;
  next();
});

//Set Routes`
app.use('/', index);
app.use('/users', users);

app.listen(port, () => {
  console.log(`Server started at port: ${port}`)
});