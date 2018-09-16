const Student = require('../models/Student');

exports.login = (req, res, next) => {
  const id = req.body.id;
  const password = req.body.password;

  req.checkBody('id', 'Id field is required').notEmpty();
  req.checkBody('password', 'Password field is required').notEmpty();

  let errors = req.validationErrors();
  if (errors) {
    res.render('register', {
      errors
    });
  } else {
    console.log("SUCCESS");
    res.redirect('/mainpage', { });
}
