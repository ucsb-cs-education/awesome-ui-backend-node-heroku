var app = require('../../app.js');
var passportStub = require('passport-stub');
passportStub.install(app);
var request = require('supertest');
var expect = require("chai").expect;
var utils = require("../utils");


describe('/logout', function() {

  describe('Unauthenticated users', function() {
    it('should redirect an unauthenticated user to /', function(done) {
      request(app)
      .get('/logout')
      .end(function(err, res) {
        expect(res.redirect).to.equal(true);
        expect(res.header.location).to.equal('/');
        expect(res.status).to.equal(302);
        done();
      });
    });
  });

  describe('Authenticated users', function() {
    before(function() {
      passportStub.login({username: 'john.doe'});
    });
    after(function() {
      passportStub.logout();
    });
    it('should redirect an authenticated user to /', function(done) {
      request(app)
      .get('/logout')
      .end(function(err, res) {
        expect(res.redirect).to.equal(true);
        expect(res.header.location).to.equal('/');
        expect(res.status).to.equal(302);
        done();
      });
    });
  });


  
  /*
  it('should redirect an unauthenticated user to /', function(done) {
    agent
    .get('/logout')
    .end(function(err, res) {
      expect(res.redirect).to.equal(true);
      expect(res.header.location).to.equal('/');
      expect(res.status).to.equal(302);
      done();
    });
  });
*/
});



