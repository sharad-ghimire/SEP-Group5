const mongoose = require('mongoose');
mongoose.connect('mongodb://whatever:whatever1@ds257372.mlab.com:57372/uts-medical-services');
const bcrypt = require('bcryptjs');

//Apointment Schema
const AppointmentSchema = mongoose.Schema({
    id: { type : Number},
    date: {type : Date},
    time: {type: TimeRanges},
    doctorId: {
        type: Number,
        required: [true]
    }
})

const Apointment = module.exports = mongoose.model('Appointment', AppointmentSchema);