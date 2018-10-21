/**
 * Test using mocha
 */

var chai = require("chai");
var mongoose = require("mongoose");
var User = require("../models/user");
var Student = require("../models/student");

var superagent = require("superagent");
var agent = superagent.agent();

var chaiHttp = require("chai-http");
var app = require("../app");
var should = chai.should();

var expect = chai.expect;

chai.use(chaiHttp);

var loginDetails = {
  stdId: "3290",
  password: "vivid"
};

var registerDetails = {
  name: "vincent",
  stdId: "3290",
  email: "3290@gmail.com",
  password: "vivid",
  password2: "vivid",
  isDoctor: "2"
};
var appointmentDetails = {
  medicalType : "hiv",
  date: "2018-10-08",
  timeneeded: "10:30 AM",
  doctor: "Ted Mosby",
  stdId: "3290"
}

describe("Create Account and Testing", function() {
  this.timeout(0);
  //delete account before testing
  before(function(done) {
    User.deleteOne({ name: "vincent" }, function(err, user) {
      if (err) return console.error(err);
    });
    done();
  });
  //conncetion testing
  describe("Connection test", function(){
    it("it should display homepage", function(done){
      chai.request("http://localhost:3000")
      .get("/")
      .end(function(err, res){
        expect(res).to.have.status(200);
        done();
      })
    })
  });
  describe("/POST Register and /POST Login", function() {
    //Test register function
    it("it should Register", function(done) {
      chai
        .request("http://localhost:3000")
        .post("/register")
        .send(registerDetails)
        .end(function(err, res) {
          expect(res).to.redirectTo("http://localhost:3000/login");
          res.should.have.status(200);
          done();
        });
    });
    //Test if the user is saved
    it("database should save user", function(done){
      User.findOne({stdId:"3290"}, function(err, result){
        expect(result.stdId).to.not.be.undefined;
        expect(result.password).to.not.be.undefined;
        expect(result.name).to.not.be.undefined;
        Student.findOne({stdId:"3290"}, function(err, result2){
          expect(result2.email).not.to.be.undefined;
        done();
      })
    })
    });
    //Test the log in function
    it("it should Login", function(done) {
      agent
        .post("http://localhost:3000/login")
        .send(loginDetails)
        .end((err, res) => {
          expect(res).to.redirectTo("http://localhost:3000/users/profile");
          res.should.have.status(200);
          done();
      })
    });
    //Test appointment function
    it("it should make an appointment", function(done){
      chai
        .request("http://localhost:3000/")
        .post("users/appointment")
        .send(appointmentDetails)
        .end((err,res) =>{
          expect(res).to.have.status(200);
          done();
        })
    })
  });
});
