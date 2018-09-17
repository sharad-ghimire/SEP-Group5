const Student = require('../models/Student');
const bcrypt = require('bcryptjs');

exports.register = (req, res, next) => {

  var newStudent = new Student({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    address: req.body.address,
    email: req.body.email,
    studentID: req.body.studentID,
    password: req.body.password,
    password2: req.body.password2,
    phoneNumber: req.body.phoneNumber,
    stdYear: req.body.stdYear,
    stdSemester: req.body.stdSemester
  });

  //Express Validator
  req.checkBody('firstName', 'First Name field is required').notEmpty();
  req.checkBody('lastName', 'Last Name field is required').notEmpty();
  req.checkBody('email', 'Email must be valid').isEmail();
  req.checkBody('studentID', 'Id field is required').notEmpty();
  req.checkBody('password', 'Password field is required').notEmpty();
  req.checkBody('password2', 'Both Password should match').equals(req.body.password);

  let errors = req.validationErrors();
  if (errors) {
    console.log(errors);
    res.render('register', {
      errors
    });
  } else {
    Student.findOne({
      studentID: req.body.studentID
    }).then(student => {
      if (student) {
        req.flash('error_msg', 'Student ID Already exits, login instead!');
        res.redirect('/register', {
          errors
        });
      } else {
        bcrypt.genSalt(10, (err, salt) => {
          if (err) throw err;
          bcrypt.hash(newStudent.password, salt, (err, hash) => {
            if (err) throw err;
            newStudent.password = hash;
            console.log(newStudent);
            newStudent.save()
              .then(student => {
                res.redirect('/mainpage', {
                  student
                });
              }).catch(err => {
                console.log(err);
                return;
              });
          })
        });
      }
    });
  }
}