//Entry file
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const exphb = require('express-handlebars');

//Initial application with express
const app = express();
const port = 3000;

//Connection to the local MongoDB database
// but for project we will be using mLab Cloud MongoDB services

//Local database
//if deprecated warrnig
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/utsmedical', {
  useNewUrlParser: true
}).then(() => {
  console.log('MongoDB Connected')
}).catch(err => console.log(err));


//Load Models
const Student = require('./models/Student');
const Doctor = require('./models/Doctors');
//Middlewares -->  has access to request and response object  -- Only third party

//Handlebars templateing engine with main layout
app.engine('handlebars', exphb({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

//dummy middleware
app.use((req, res, next) => {
  // console.log(Date.now());
  next(); //go to next middleware
});

//parse using body parser //deals with forms data
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

//set Public folder
app.use(express.static(path.join(__dirname, 'public')));

//Default route
app.get('/', (req, res) => {
  const title = "Welcome";
  res.render('index', {
    title: title
  });
});

//Login route
app.get('/login', (req, res) => {
  res.render('loginAndRegister/login');
});

//Process POST request
app.post('/main', (req, res) => {
  let errMsg = [];
  if (!req.body.id) {
    errMsg.push("Add you ID !!!")
  }
  if (!req.body.psw) {
    errMsg.push("And Your Password as well")
  }

  if (errMsg.length > 0) {
    res.render("loginAndRegister/login", {
      errors: errMsg,
      id: req.body.id,
      psw: req.body.psw
    });
  } else {
    res.send("passed");
  }
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port} . . .`);
});