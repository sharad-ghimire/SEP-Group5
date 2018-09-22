const Student = require('../models/Student');
const passport = require('passport');
exports.login = (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/student/mainpage',
    failureRedirect: '/login',
    failureFlash: true
  })(req, res, next);
};

exports.logout = (req, res) => {
  req.logout();
  res.redirect('/login');
};