const mongoose = require("mongoose");

const AppointmentSchema = mongoose.Schema({
  id: { type: String },
  appointmentType: { type: Array },
  date: { type: String },
  time: { type: String },
  doctorName: { type: String },
  studentId: { type: String }
});

module.exports = mongoose.model("Appointment", AppointmentSchema);
