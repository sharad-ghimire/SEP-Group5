const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//Initial application with express
const app = express();
const port = 3000;

//Connection to the database
// const mongoDB = 'mongodb://127.0.0.1/my_database'; //database name
// mongoose.connect(mongoDB, {
//   useNewUrlParser: true
// });
// // Get Mongoose to use the global promise library
// mongoose.Promise = global.Promise;
// //Get the default connection
// const db = mongoose.connection;
// //Bind connection to error event (to get notification of connection errors)
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));



//Loading Pug as view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//parse application
app.use(bodyParser.urlencoded({
  extended: false
}));
//parse application/json
app.use(bodyParser.json());

//Set Public folder 
app.use(express.static(path.join(__dirname, 'public')));

//Default route
app.get('/', (req, res) => {
  res.render('index', {
    title: 'Hello'
  });
});

//Login route
app.get('/login', (req, res) => {
  res.render('login');
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port} . . .`)
});