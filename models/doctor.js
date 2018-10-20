const mongoose = require("mongoose");
//Doctor Schema
const DoctorSchema = mongoose.Schema({
  id: { type: String},
  name: { type: String },
  address: { type: String },
  email: { type: String },
  phone_no: { type: String },
  typeOfDoctor: { type: String }
});
module.exports = mongoose.model("Doctor", DoctorSchema);

