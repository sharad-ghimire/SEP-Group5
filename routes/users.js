/**
 * Users route of our application
 * Anything that is related to specific user will route to this router
 */
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const _ = require("lodash");
const nodemailer = require("nodemailer");
const xoauth2 = require("xoauth2");
//Model
const Student = require("../models/student");
const Doctor = require("../models/doctor");
const Appointment = require("../models/appointment");
const User = require("../models/user");
// GET Appointment Route
router.get("/appointment", (req, res, next) => {
  if (req.user == null) {
    req.flash("error_msg", "You are not authorized, Login First to continue");
    res.redirect("/login");
  } else {
    res.render("appointment");
  }
});

router.post("/profile", (req, res, next) => {
  if (req.user.doctor === true) {
    Doctor.findOneAndUpdate(
      { id: req.body.id },
      {
        name: req.body.name,
        email: req.body.email,
        id: req.body.id,
        phone_no: req.body.phone_no,
        address: req.body.address,
        typeOfDoctor: req.body.typeOfDoctor
      },
      (err, todo) => {
        if (err) return res.status(500).send(err);
      }
    );
  } else {
    Student.findOneAndUpdate(
      { stdId: req.body.stdId },
      {
        name: req.body.name,
        email: req.body.email,
        stdId: req.body.stdId,
        phone_no: req.body.phone_no,
        address: req.body.address,
        year: req.body.year,
        semester: req.body.semester
      },
      (err, todo) => {
        if (err) return res.status(500).send(err);
      }
    );
  }
  res.render("successUpdate.ejs");
});

//Dashboard Route
router.get("/dashboard", (req, res, next) => {
    if (req.user == null) {
        req.flash("error_msg", "You are not authorized!");
        res.redirect("/login");
    } else {
        if (req.user.doctor == true) {
            Doctor.find({ id: req.user.stdId })
                .then(data => {
                    Appointment.find({ doctorName: req.user.name })
                        .then(result => {
                            res.render("dashboard", { result, data, total: result.length });
                        })
                        .catch(err => {
                            console.error(err);
                        });
                })
                .catch(err => console.log("Error"));
        } else {
            //Search DB by finding studentID
            Student.find({ stdId: req.user.stdId }).then(studentData => {
                Appointment.find({ studentId: req.user.stdId })
                    .then(result => {
                        res.render("dashboard", { result, studentData , total: result.length});
                    })
                    .catch(err => {
                        console.error(err);
                    });
            });
        }

    }

});

//App History route
router.get("/apphis", (req, res, next) => {
    if (req.user == null) {
        req.flash("error_msg", "You are not authorized!");
        res.redirect("/login");
    } else {
        if (req.user.doctor == true) {
            Doctor.find({ id: req.user.stdId })
                .then(data => {
                    Appointment.find({ doctorName: req.user.name })
                        .then(result => {
                            res.render("apphis", { result, data });
                        })
                        .catch(err => {
                            console.error(err);
                        });
                })
                .catch(err => console.log("Error"));
        } else {
            //Search DB by finding studentID
            Student.find({ stdId: req.user.stdId }).then(studentData => {
                Appointment.find({ studentId: req.user.stdId })
                    .then(result => {
                        res.render("apphis", { result, studentData });
                    })
                    .catch(err => {
                        console.error(err);
                    });
            });
        }

    }

});

//GET Profile route
router.get("/profile", (req, res, next) => {
  if (req.user == null) {
    req.flash("error_msg", "You are not authorized!, Login first to Continue");
    res.redirect("/login");
  } else {
    if (req.user.doctor == true) {
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
      Student.find({ stdId: req.user.stdId }).then(studentData => {
        Appointment.find({ studentId: req.user.stdId })
          .then(result => {
            res.render("profile", { result, studentData });
          })
          .catch(err => {
            console.error(err);
          });
      });
    }
  }
});

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
    let doctorEmail = "";
    Doctor.findOne({ name: req.body.doctor })
      .then(doctor => (doctorEmail = doctor.email))
      .catch(err => console.log(err));

    Student.findOne({ stdId: req.body.stdId })
      .then(student => {
        //Send Mail to the user
        const email = student.email;
        const output = `
          <h3>Booking for Dr. ${req.body.doctor}.</h3>
          <p>Hi ${student.name}, </p>
          <p>You booked for a ${req.body.medicalType} in ${new Date()
          .toJSON()
          .slice(0, 10)
          .replace(/-/g, "/")}. Below are details of booking.</p>
          <ul>
          <li>Date: ${req.body.date}</li>
          <li>Time: ${req.body.timeneeded}</li>
          <li>Doctor: ${req.body.doctor}</li>
          </ul>
          <p>You are responsible for your appointment. If you do not attend for a scheduled appointment (or provide 3 hours’
              notice of cancellation) we will record this information. Commencing on 1 January 2017, if you do not attend for
              a scheduled appointment (or provide 3 hours’ notice to cancel your appointment) on more than one occasion you
              will be charged a non-attendance fee of $40, so we urge you to contact us to let us know if you cannot attend
              your appointment. You will only be permitted to attend this practice for a further appointment following payment
              of the non-attendance fee. The non-attendance fee will not be claimable from Medicare or private health
              insurance.</p>`;

        // Create a SMTP transporter object
        const transporter = nodemailer.createTransport({
          host: "smtp.ethereal.email",
          port: 587,
          auth: {
            user: "b3hfow5wgtangdhx@ethereal.email",
            pass: "qgCpgbb8yTZ8yC4716"
          }
        });

        // Message object
        const message = {
          from: "UTS Medical Services <sender@example.com>",
          to: `${student.name} <${student.email}>`,
          subject: "Appointment Confimed",
          text: "",
          html: output
        };

        transporter.sendMail(message, (err, info) => {
          if (err) {
            console.log("Error occurred. " + err.message);
            return process.exit(1);
          }

          console.log("Message sent: %s", info.messageId);
          // Preview only available when sending through an Ethereal account
          console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        });
      })
      .catch(err => console.log(err));
  });
  res.render("success.ejs");
});


//Specific doctor route with specific :id
router.get("/doc/:id", (req, res, next) => {
    let docId = req.params.id;
    console.log(docId)
    Doctor.findOne({ name: docId }).then(doctor => {
        console.log(doctor);
        res.render("eachDocProfile", {docId: docId, doctor: doctor});
        })
        .catch(err => console.log(err));

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
