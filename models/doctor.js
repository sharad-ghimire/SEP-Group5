const mongoose = require('mongoose');
mongoose.connect('mongodb://whatever:whatever1@ds257372.mlab.com:57372/uts-medical-services');
const bcrypt = require('bcryptjs');

//Doctor Schema
const DoctorSchema = mongoose.Schema({
    id: {
        type : Number,
        required: [true]
    },
    first_name:{ 
        type : String
    },
    last_name:{
        type : String
    },
    Address:{
        type: String
    },
    Email:{
        type: String
    },
    Phone_no:{
        type: Number
    },
    Type: {
        type: String
    }
});

const Doctor = module.exports = mongoose.model('Doctor', DoctorSchema);