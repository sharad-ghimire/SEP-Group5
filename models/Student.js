const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const StudentSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  address: {
    type: String,
    required: true
  },
  studentID: {
    type: Number,
    unique: true,
    required: true
  },
  password: {
    type: String,
    require: true
  },
  phoneNumber: {
    type: String
  },
  stdYear: {
    type: Date
  },
  stdSemester: {
    type: String
  }
});

module.exports = mongoose.model('Student', StudentSchema);
