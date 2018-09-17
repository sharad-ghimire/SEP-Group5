const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const session = require('express-session');
const passport = require('passport');
const cookieSession = require('cookie-session');



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





//Body parser Middle ware //deals with forms data
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

//Express session Middleware -- From githib documentation
// app.use(session({
//   secret: 'secret',
//   saveUninitialized: true,
//   resave: true
// }));

app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [env.session.cookieKey]
}));

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
//passport Config
require('./config/passport')(passport);

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

//Routers
const index = require('./routes/index');
// const student = require('./routes/student');
app.use('/', index);
// app.use('/student', student);



app.listen(env.port, () => {
  console.log(`Server running on http://localhost:${env.port} . . .`);
});