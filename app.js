const express = require('express');
const config = require('./config/config');
const path = require('path');
const app = express();

//database connection 
require('./config/database')();

//Setup the app middleware
require('./middleware/appMiddleware')(app);

// //Passport Middleware


// //passport Config
// require('../config/passport')(passport);

//setting views engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//seting static assests folder
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));

//Global Variables
app.use((req, res, next) => {
  res.locals.errors = null;
  res.locals.user = req.user || null; //our session of user
  next();
});


//Routers for root route
const index = require('./routes/index');
app.use('/', index);

//Routers for student route
// const student = require('./routes/student');
// app.use('/mainpage/student', student);

//For testing 
//module.exports = app;


app.listen(config.port, () => {
  console.log(`Server running on http://localhost:${config.port} . . .`);
});