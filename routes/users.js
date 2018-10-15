/**
 * Users route of our application
 * Anything that is related to specific user will route to this router
 * 
 */
var express = require("express");
var router = express.Router();

const doctors = require("../data/doctor.json");
const students = require("../data/students.json");
const appointments = require("../data/appointments.json");

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
  if (req.user == null){
    req.flash("error_msg", "You are not authorized!, Login first to Continue");
    res.redirect("/login")
  } else {
    const app = [];
    const listOfappointments = students[1].appointments;

    //loop through the the available appointments to find the related data
    if (listOfappointments.length > 0) {
      for (let j = 0; j < listOfappointments.length; j++) {
        for (let i = 0; i < appointments.length; i++) {
          if (listOfappointments[j] === appointments[i]._id) {
            app.push(appointments[i]);
          }
        }
      }
    }
    
    res.render("profile", {
      app,
      doctors,
      students
    });
  }
  

  
});


//POST route to profile
router.post("/profile", (req, res) => {
  console.log(req.body.new_firstname);
  res.render("profile", {
    app,
    doctors,
    students
  });
});

//POST Route to appointment
router.post("/appointment", (req, res, next) => {
  // res.json(req.body);
  res.render("success.ejs");
});


//Specific doctor route with specific :id
router.get("/doc/:id", (req, res, next) => {
  if (req.user == null) {
    req.flash("error_msg", "You are not authorized!, Login first to Continue");
    res.redirect("/login")
  } else {
    let docId = req.params.id; 
    res.render("eachDocProfile", {
        docId: docId
      });
  }
});

module.exports = router;
