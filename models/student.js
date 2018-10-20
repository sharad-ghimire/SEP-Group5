const mongoose = require("mongoose");
//students schema
const StudentSchema = mongoose.Schema({
  stdId: { type: String },
  name: { type: String },
  address: { type: String },
  email: { type: String },
  phone_no: { type: Number },
  year: { type: Number },
  semester: { type: String },
  password: {type: String}
});

module.exports = mongoose.model("Student", StudentSchema); //Name of the model Student