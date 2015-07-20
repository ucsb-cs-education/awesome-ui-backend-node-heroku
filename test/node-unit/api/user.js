var app = require('../../../index.js');
var request = require('supertest');
var expect = require("chai").expect;
var agent = request.agent(app);
var utils = require("../../utils");



// test construction helpers
// Fix this..... How to wait for sequelize to finish connection before starting?
before(function(done) {
  request(app).get('/').end(function(){
    request(app).get('/student').end(function() {
    request(app).get('/student').end(function() {
    request(app).get('/student').end(function() {
done();
    });

    });

    });
  });
});

describe('UPDATE /api/user/:awesome_id', function() {
  var testUser = {
    account_type: "test",
    id: 11,
    email: "test@email.com",
    token: "test_token",
    name: "TestName",
    awesome_id: 1
  };
  
  before(function(done) {
    agent
    .get(utils.createTestAuthUrl("test", 11, "test_token", "test_email", "Test Name"))
    .expect(302)
    .end(function(err, res){
      done()
    });
  });

  it('should return 403 Forbidden if user is not authenticated as given awesome_id', function(done) {
    agent
    .put('/api/user/' + 10 + testUser.awesome_id)
    .expect(403)
    .end(function(err, res) {
      if (err) return done(err);
      done();
    });
  });

  it('should return 400 Bad Request if missing role parameter', function(done) {
    agent
      .put('/api/user/' + testUser.awesome_id)
      .expect(400)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });

  it('should return 400 Bad Request if role is anything but student, instructor, author, or developer', function(done) {
    agent
      .put('/api/user/1?role=somethingelse')
      .expect(400)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });

  it('should return 200 and json object { success: true, error: null } if successful', function(done) {
    agent
      .put('/api/user/1?role=author')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });

});








