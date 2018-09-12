//Entry file
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const expressValidator = require('express-validator');
const session = require('express-session');
const passport = require('passport');

//Initialize application with express
const app = express();
const port = 3000;

//Templateing engine EJS
app.set('view engine', 'ejs');

//Body parser Middle ware //deals with forms data
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());


//Express session Middleware -- From githib documentation
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}));

//Express messages
app.use(require('connect-flash')());
app.use((req, res, next) => {
  res.locals.messages = require('express-messages')(req, res);
  next();
});


//Express Validator -- From githib documentation
app.use(expressValidator({
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
}));

//seting static assests folder
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));


//Routers
const index = require('./routes/index');
const student = require('./routes/student');
app.use('/', index);
// app.use('/student', student);





//Connection to the local MongoDB database
// but for project we will be using mLab Cloud MongoDB services

//Local database
// if deprecated warrnig
// mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost/utsmedical', {
//   useNewUrlParser: true
// }).then(() => {
//   console.log('MongoDB Connected')
// }).catch(err => console.log(err));

//Load JSON datas to simulate Database
const studentsJSON = require('./data/student.json');

//Load Models
const Student = require('./models/Student');
const Doctor = require('./models/Doctors');
//Middlewares -->  has access to request and response object  -- Only third party

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port} . . .`);
});