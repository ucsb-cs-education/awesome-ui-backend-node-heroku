var app = require('../../app.js');
var passportStub = require('passport-stub');
passportStub.install(app);
var request = require('supertest');
var expect = require("chai").expect;
var utils = require("../utils");
var models = require('../../models');


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
});


describe('Auth callback redirecting', function() {
  beforeEach(function(done) {
    request(app)
    .get('/logout')
    .end(function(err, res) {
        models.sequelize.sync({ force: true }).then(function () {
            done();
        });
    });
  });

  it('should redirect a user to their preferred role: student', function(done) {
    request(app)
    .get(utils.createTestAuthUrl('test', 1, 'test_token', 'test@email.com', 'Test Name', 'author'))
    .end(function(err, res) {
      expect(res.redirect).to.equal(true);
      expect(res.header.location).to.equal('/author');
      expect(res.status).to.equal(302);
      done();
    });
  });
  it('should redirect a user to their preferred role: developer', function(done) {
    request(app)
    .get(utils.createTestAuthUrl('test', 2, 'test_token', 'test@email.com', 'Test Name', 'developer'))
    .end(function(err, res) {
      expect(res.redirect).to.equal(true);
      expect(res.header.location).to.equal('/developer');
      expect(res.status).to.equal(302);
      done();
    });
  });
});






