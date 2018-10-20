const mongoose = require("mongoose");
//User Schema
const UserSchema = mongoose.Schema({
  name: {
    type: String
  },
  stdId: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  doctor: {
    type: Boolean
  }
});

const User = (module.exports = mongoose.model("User", UserSchema));
