const mongoose = require('mongoose');
mongoose.connect('mongodb://whatever:whatever1@ds257372.mlab.com:57372/uts-medical-services');
const bcrypt = require('bcryptjs');

//User Schema
const UserSchema = mongoose.Schema({
  name: {
    type: String
  },
  stdId: {
    type: String
  },
  password: {
    type: String
  },
  doctor: {
    type: Boolean
  }
});

const User = module.exports = mongoose.model('User', UserSchema);