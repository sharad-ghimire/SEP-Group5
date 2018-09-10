//Entry file
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//Initial application with express
const app = express();
const port = 3000;

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
const studentsJSON = require("./data/student.json");

//Load Models
const Student = require('./models/Student');
const Doctor = require('./models/Doctors');
//Middlewares -->  has access to request and response object  -- Only third party

//Pug templateing engine as default
//If we want to use ejs app.set("views", "./views"); and then write
//res.render('index.ejs);
app.set('view engine', 'pug');

//parse using body parser //deals with forms data
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

//seting static assests folder
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));


//Default route
app.get('/', (req, res) => res.render('index', {
  title: "Homepage"
}));


//Login route
app.get('/login', (req, res) => res.render('login', {
  title: "Login"
}));

app.post('/login', (req, res) => {
  const id = req.body.id;
  const password = req.body.password;
  const details = {
    id,
    password
  }
  res.json(details);
});

app.get('/main', (req, res) => {
  res.render('main', {
    title: 'Mainpage',
    students: studentsJSON
  });
});

app.get('/register', (req, res) => {
  res.render('register')
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port} . . .`);
});