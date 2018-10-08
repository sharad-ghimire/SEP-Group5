const mongoose = require('mongoose');
mongoose.connect('mongodb://whatever:whatever1@ds257372.mlab.com:57372/uts-medical-services');
const bcrypt = require('bcryptjs');

//Availability Schema
const AvailabilitySchema = mongoose.Schema({
    date: {
        type : String,
        time: {
            type : String,
            doctors:[{type:Array[Schema.ObjectId], ref: 'doctor'}]
        }
    }
});

const Availability = module.exports = mongoose.model('Availability', AvailabilitySchema);