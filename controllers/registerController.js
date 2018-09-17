//Load Models
const Student = require('../models/Student');

exports.register = (req, res, next) => {

  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const id = req.body.id;
  const password = req.body.password;
  const password2 = req.body.password2;

  //Express Validator
  req.checkBody('firstName', 'First Name field is required').notEmpty();
  req.checkBody('lastName', 'Last Name field is required').notEmpty();
  req.checkBody('email', 'Email must be valid').isEmail();
  req.checkBody('id', 'Id field is required').notEmpty();
  req.checkBody('password', 'Password field is required').notEmpty();
  req.checkBody('password2', 'Both Password should match').equals(req.body.password);

  let errors = req.validationErrors();
  if (errors) {
    res.render('register', {errors});
  } else {
  console.log("SUCCESS");

  const newUser = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    address: req.body.address,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    stdSemester: req.body.stdSemester
  };

  new Student(newUser).save().then(user => {
    res.redirect('/mainpage', {user});
  });
}
// }
