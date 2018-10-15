/**
 * Test using mocha
 */

var chai = require("chai");
var mongoose = require("mongoose");
var User = require("../models/user");

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
  password: "vivid",
  password2: "vivid",
  isDoctor: false
};

describe("Create Account and Log in", function() {
  this.timeout(0);
  before(function(done) {
    User.remove({ name: "vincent" }, function(err, user) {
      if (err) return console.error(err);
    });
    done();
  });

  describe("/POST Register and /POST Login", function() {
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
    it("it should Login", function(done) {
      agent
        .post("http://localhost:3000/login")
        .set("Token", "text/plain")
        .set("content-Type", "application/x-www-form-urlencoded")
        .type("form")
        .send({ stdId: "3290" })
        .send({ password: "vivid" })
        .end((err, res) => {
          expect(res).to.redirectTo("http://localhost:3000/users/profile");
          res.should.have.status(200);
          done();
        });
    });
  });
});
