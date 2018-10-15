const mongoose = require('mongoose');
mongoose.connect('mongodb://whatever:whatever1@ds257372.mlab.com:57372/uts-medical-services');
const bcrypt = require('bcryptjs');

//students schema
const StudentSchema = mongoose.Schema({
    id: {
        type: String
    },
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    Address: {
        type: String
    },
    Email: {
        type: String
    },
    Phone_no: {
        type: Number
    },
    Year: {
        type: Number
    },
    Semester: {
        type: String
    },
    Appointments: {
        type: Array
    }
});
const Student = module.exports = mongoose.model('Student', StudentSchema);