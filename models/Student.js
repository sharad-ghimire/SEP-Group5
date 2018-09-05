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
  address: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phoneNumber: String,
  stdYear: {
    type: Date,
    default: Date.now
  },
  stdSemester: String
});

module.exports = mongoose.model('Student', StudentSchema);