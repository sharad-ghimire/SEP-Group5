const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AppointmentSchema = new Schema({
  //TODO +AppointmentSchema
});

module.exports = mongoose.model('Apppointment', AppointmentSchema);
