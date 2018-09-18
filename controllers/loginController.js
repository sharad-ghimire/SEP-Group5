const Student = require('../models/Student');
const passport = require('passport');
exports.login = (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/mainpage',
    failureRedirect: '/login',
    failureFlash: true
  })(req, res, next);

};

exports.logout = (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are now loggedout');
  res.redirect('/login');
};