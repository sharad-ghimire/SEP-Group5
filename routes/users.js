/**
 * Users route of our application
 * Anything that is related to specific user will route to this router
 */
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const _ = require("lodash");

//Dummy Data
// const doctors = require("../data/doctor.json");
// const students = require("../data/students.json");
// const appointments = require("../data/appointments.json");

//Models
const Doctor = require("../models/doctor");
const Appointment = require("../models/appointment");
// GET Appointment Route
router.get("/appointment", (req, res, next) => {
  if (req.user == null) {
    req.flash("error_msg", "You are not authorized, Login First to continue");
    res.redirect("/login");
  } else {
    res.render("appointment");
  }
});

//GET Profile route
router.get("/profile", (req, res, next) => {
  if (req.user == null) {
    req.flash("error_msg", "You are not authorized!, Login first to Continue");
    res.redirect("/login");
  } else {
    if (req.user.doctor == true) {
      console.log("Yo ur doctor");
      Doctor.find({ id: req.user.stdId })
        .then(data => {
          Appointment.find({ doctorName: req.user.name })
            .then(result => {
              res.render("profile", { result, data });
            })
            .catch(err => {
              console.error(err);
            });
        })
        .catch(err => console.log("Error"));
    } else {
      //Search DB by finding studentID
      console.log("Yo ur student");
      Appointment.find({ studentId: req.user.stdId })
        .then(result => {
          res.render("profile", { result });
        })
        .catch(err => {
          console.error(err);
        });
    }
  }
});

//POST route to profile
// router.post("/profile", (req, res) => {
//   console.log(req.body.new_firstname);
//   res.render("profile", {
//     app,
//     doctors,
//     students
//   });
// });

//POST Route to appointment
router.post("/appointment", (req, res, next) => {
  const appointment = new Appointment({
    appointmentType: req.body.medicalType,
    date: req.body.date,
    time: req.body.timeneeded,
    doctorName: req.body.doctor,
    studentId: req.body.stdId
  });
  appointment.save((err, appointment) => {
    if (err) throw err;
  });
  res.render("success.ejs");
});

// router.get("/dashboard", (req, res, next) => {
//   res.render("dashboard.ejs");
// });

router.get("/appointment-history", (req, res, next) => {
  res.render("app-history.ejs");
});

//Specific doctor route with specific :id
router.get("/doc/:id", (req, res, next) => {
  if (req.user == null) {
    req.flash("error_msg", "You are not authorized!, Login first to Continue");
    res.redirect("/login");
  } else {
    let docId = req.params.id;
    res.render("eachDocProfile", {
      docId: docId
    });
  }
});

//AJAX routes
router.post("/dates", (req, res) => {
  let availability = require("../data/availability");
  let dateFromClient = req.body.date;
  let dateKey = Object.keys(availability);

  if (_.includes(dateKey, dateFromClient)) {
    let timesObject = availability[dateFromClient];
    console.log(timesObject);
    if (req.body.date === "" || req.body.date === undefined) {
      res.json("");
    } else {
      res.json(timesObject);
    }
  } else {
    res.json("");
  }
});
module.exports = router;
