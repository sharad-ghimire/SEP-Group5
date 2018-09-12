const express = require('express');
const router = express.Router();

const registerController = require('../controllers/registerController');

//Home Page
router.get('/', (req, res, next) => {
  res.render('index');
});

//Register Form
router.get('/register', (req, res, next) => {
  res.render('register');
});

router.post('/register', registerController.register);

module.exports = router;



// //Default route
// app.get('/', (req, res) =>
//   res.render('index', {
//     title: 'Homepage'
//   })
// );

// //Login route
// app.get('/login', (req, res) =>
//   res.render('login', {
//     title: 'Login'
//   })
// );

// app.post('/login', (req, res) => {
//   const id = req.body.id;
//   const password = req.body.password;
//   const details = {
//     id,
//     password
//   };
//   res.json(details);
// });

// app.get('/main', (req, res) => {
//   res.render('main', {
//     title: 'Mainpage',
//     students: studentsJSON
//   });
// });

// app.get('/register', (req, res) => {
//   res.render('register');
// });