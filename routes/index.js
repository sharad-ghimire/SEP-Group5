/**
 * Index route of our application
 * Any thing with '/' will route to this router
 */
const express = require("express");
const router = express.Router();
const passport = require("passport");

const bcrypt = require("bcryptjs");

let User = require("../models/user");
let Student = require("../models/student");
let Doctor = require("../models/doctor");

//Home Page
router.get("/", (req, res, next) => {
  res.render("login");
});

//Login Route
router.get("/login", (req, res, next) => {
  res.render("login");
});

//Register Route
router.get("/register", (req, res, next) => {
  res.render("register");
});

/*Post route for register
* Will handle registration of user to the Database
*/
router.post("/register", (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const stdId = req.body.stdId;
  const password = req.body.password;
  const password2 = req.body.password2;
  const doctor = req.body.isDoctor === "1";
  console.log(doctor);

  //Checks for Validation
  req.checkBody("name", "Name field is required").notEmpty();
  req.checkBody("stdId", "ID field is required").notEmpty();
  req.checkBody("password", "Password field is required").notEmpty();
  req
    .checkBody("password2", "Passwords do not match")
    .equals(req.body.password);

  let errors = req.validationErrors();
  if (errors) {
    res.render("register", {
      errors: errors
    });
  } else {
    User.findOne({
      stdId: req.body.stdId
    }).then(user => {
      if (user) {
        req.flash("error_msg", "Student Id already exists");
        res.redirect("/register");
      } else {
        const newUser = new User({
          name: name,
          stdId: stdId,
          email: email,
          password: password,
          doctor: doctor
        });

        if (doctor) {
          const newDoctor = new Doctor({
            id: stdId,
            name: name,
            address: "",
            email: email,
            phone_no: "",
            typeOfDoctor: ""
          });
          newDoctor
            .save()
            .then(user => {})
            .catch(err => console.log(err));
        } else {
          const newStudent = new Student({
            stdId: stdId,
            name: name,
            address: "",
            email: email,
            phone_no: "",
            year: "",
            semester: "",
            password: password
          });
          newStudent
            .save()
            .then(user => {})
            .catch(err => console.log(err));
        }

        //bcrypt is used for the encryption of password
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                req.flash("sucess_msg", "You are now registered pal!");
                res.redirect("/login");
              })
              .catch(err => {
                console.log(err);
                return;
              });
          });
        });
      }
    });
  }
});

//Login Processing route
router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/users/profile",
    failureRedirect: "/login",
    failureFlash: true
  })(req, res, next);
});

//Logout route which simply redirect to login by deleteing the session object of user
router.get("/logout", (req, res, next) => {
  req.logout();
  req.flash("sucess_msg", "You are now logged out!");
  res.redirect("/login");
});

module.exports = router;
