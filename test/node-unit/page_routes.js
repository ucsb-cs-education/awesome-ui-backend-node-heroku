var app = require('../../app.js');
var models = require('../../models');
var request = require('supertest');
var utils = require("../utils");
var expect = require("chai").expect;

// test construction helpers

describe('Page routing', function() {
  describe('/', function() {
    it('should respond with 200 status and html type', function(done) {
      request(app)
      .get('/')
      .expect(200)
      .end(done);
    });
  });
  describe('/student', function() {
    it('should respond with 200 status and html type', function(done) {
      request(app)
      .get('/student')
      .expect(200)
      .end(done);
    });
  });
  describe('/instructor', function() {
    it('should respond with 200 status and html type', function(done) {
      request(app)
      .get('/instructor')
      .expect(200)
      .end(done);
    });
  });
  describe('/author', function() {
    it('should respond with 200 status and html type', function(done) {
      request(app)
      .get('/author')
      .expect(200)
      .end(done);
    });
  });
  describe('/developer', function() {
    it('should respond with 200 status and html type', function(done) {
      request(app)
      .get('/developer')
      .expect(200)
      .end(done);
    });
  });
  describe('/pagethatdoesntexist', function() {
    it('should respond with 404 status', function(done) {
      request(app)
      .get('/pagethatdoesntexist')
      .expect(404)
      .end(done);
    });
  });

  describe('/login', function() {
    describe('when users are unauthenticated', function() {
      before(function(done) {
        utils.resetEnvironment(app, models).then(function() {
          done();
        });
      });
      it('should respond with 200 status and html type', function(done) {
        request(app)
        .get('/login')
        .expect(200)
        .end(done);
      });
    });
    describe('when users are authenticated', function() {
      var testUser;
      before(function(done) {
        utils.resetEnvironment(app, models).then(function() {
          utils.authenticateTestUser().then(function(user) {
            testUser = user;
            done();
          });
        });
      });
      after(function() {
        utils.unauthenticateTestUser();
      });
      it('should respond with 302 status redirect to user preferred page', function(done) {
        request(app)
        .get('/login')
        .expect(302)
        .end(function(err, res) {
          expect(res.redirect).to.equal(true);
          expect(res.header.location).to.equal('/author');
          done();
        });
      });
    });
  });



  describe('/usersettings', function() {
    describe('when users are unauthenticated', function() {
      before(function(done) {
        utils.resetEnvironment(app, models).then(function() {
          done();
        });
      });

      it('should respond with 302 status and redirect user to login page', function(done) {
        request(app)
        .get('/usersettings')
        .expect(302)
        .end(function(err, res) {
          expect(res.redirect).to.equal(true);
          expect(res.header.location).to.equal('/login');
          done();
        });
      });
    });
    describe('when users are authenticated', function() {
      var testUser;
      before(function(done) {
        utils.resetEnvironment(app, models).then(function() {
          utils.authenticateTestUser().then(function(user) {
            testUser = user;
            done();
          });
        });
      });
      after(function() {
        utils.unauthenticateTestUser();
      });

      it('should respond with 200', function(done) {
        request(app)
        .get('/usersettings')
        .expect(200)
        .end(done);
      });
    });
  });

});



