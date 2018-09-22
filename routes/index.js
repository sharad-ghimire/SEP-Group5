const express = require('express');
const router = express.Router();
const passport = require('passport');

const registerController = require('../controllers/registerController');
const loginController = require('../controllers/loginController');

//Home Page
router.get('/', (req, res) => {
  res.render('index');
});

//Register Form
router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', registerController.register);

//Login routes
router.get('/login', (req, res) => {
  res.render('login')
});

// loginController.login
router.post('/login', (req, res) => {
  req.login(req.body.studentID, () => {
    res.redirect('/mainpage/' + req.body.studentID);
  });
  // If this function gets called, authentication was successful.
  // `req.user` contains the authenticated user.

});

//Logout Route
router.get('/logout', loginController.logout);

router.get('/mainpage/:id', (req, res, next) => {
  const id = req.params.id;
  res.render('mainpage', {
    id
  });
});

module.exports = router;