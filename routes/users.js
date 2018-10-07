var express = require('express');
var router = express.Router();

const doctors = require('../data/staff.json');
const students = require('../data/students.json');
const appointments = require('../data/appointments.json');

//Home Page
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/appointment', (req, res, next) => {
  res.render('appointment');
});

router.get('/profile', (req, res, next) => {
  const app = [];   
  const listOfappointments = students[1].appointments;

  if (listOfappointments.length > 0) {
    for (let j = 0; j < listOfappointments.length; j++) {
      for (let i = 0; i < appointments.length; i++) {
        if (listOfappointments[j] === appointments[i]._id) {
          app.push(appointments[i]);
        }
      }
    }
  }



  console.log(app);
  res.render('profile', {
    app,
    doctors
  });
});


router.post('/appointment', (req, res, next) => {
  // res.json(req.body);
  res.render('success.ejs');
});

module.exports = router;