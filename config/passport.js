const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

//Load Student Models
const Student  = require('../models/Student');

module.exports = (passport) => {
   passport.use(new LocalStrategy({usernameField: 'studentID'}, (email, password, done) => {
     const studentID = email;
     const pass = password;

     console.log(pass);

     //Check for user
     Student.findOne({studentID: studentID}).then(student => {
       if(!user){ return done(null, false, { message: 'No User Found'})}
       //match password
       bcrypt.compare(pass, student.password, (err, isMatch) => {
         if(err) throw err;
         if(isMatch){
           return done(null, student);
         } else{
           return done(null, false, { message: 'No User Found'})
         }
       })

     });
   }));
}
