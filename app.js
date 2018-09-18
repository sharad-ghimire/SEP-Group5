const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/config');
const path = require('path');

const app = express();

mongoose.Promise = global.Promise;
mongoose
  .connect(
    config.db, {
      useNewUrlParser: true
    }
  )
  .then(() => console.log('MongoDB Connected !!!'))
  .catch(err => console.log(err));


//Setup the app middleware
require('./middleware/appMiddleware')(app);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

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