const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const expressValidator = require('express-validator');
const session = require('express-session');
const passport = require('passport');


//Local Import
const env = require('./environment/variables');



//Initialize application with express
const app = express();

//Connect to the Database
mongoose.Promise = global.Promise;
mongoose.connect(env.db, {
    useNewUrlParser: true
  })
  .then(() => console.log("MongoDB Connected !!!"))
  .catch(err => console.log(err));

//Templateing engine EJS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


//Global variables
app.use((req, res, next) => {
  res.locals.errors = null;
  res.locals.error_msg = null;
  next();
});


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

//Express Validator -- From githib documentation [error formatter]
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
// const student = require('./routes/student');
app.use('/', index);
// app.use('/student', student);

//passport Config
require('./config/passport')(passport);


app.listen(env.port, () => {
  console.log(`Server running on http://localhost:${env.port} . . .`);
});
