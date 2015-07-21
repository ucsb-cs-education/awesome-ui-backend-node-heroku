var request = require('supertest');
var expect = require("chai").expect;
var utils = require("../../utils");
var agent;
var app = require('../../../app.js');
var models = require('../../../models');
var server;


var validDescriptorString = JSON.stringify({
  "version" : "0.1",
  "title" : "Example QuizJSON 1",
  "quiz": [{
    "question": "orderOfOperations",
       "repeat": 5
   }] 
});

var testUser;

describe('POST /api/quiz', function() {

  describe('Unauthenticated User', function() {
    before(function(done) {
        models.sequelize.sync({ force: true }).then(function () {
            server = app.listen(app.get('port'), function() {
                console.log('Node app is running on port', server.address().port);
                done();
            });
        });
    });
    after(function() {
        server.close();
    });
    it('should return 403 Forbidden if user is not authenticated and post is NOT formatted correctly', function(done) {
      request(app)
      .post('/api/quiz?something=blah')
      .expect(403)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
    });
    it('should return 403 Forbidden if user is not authenticated and post IS formatted correctly', function(done) {
      request(app)
      .post('/api/quiz?descriptor=' + validDescriptorString)
      .expect(403)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
    });


  });

  describe('Authenticated User', function() {
    before(function(done) {
        models.sequelize.sync({ force: true }).then(function () {
            server = app.listen(app.get('port'), function() {
                console.log('Node app is running on port', server.address().port);
                utils.authenticateTestUser().then(function(user) {
                  testUser = user;
                  done();
                });
            });
        });
    });
    after(function() {
        utils.unauthenticateTestUser();
        server.close();
    });

    it('should return 400 Bad Request if missing descriptor parameter', function(done) {
      request(app)
      .post('/api/quiz')
      .expect(400)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
    });

    it('should return unsuccessful if the descriptor syntax is invalid', function(done) {
      request(app)
      .post('/api/quiz?descriptor={something}')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.body.success).to.equal(false);
        expect(res.body.error).to.equal(null);
        expect(res.body.message).to.be.a('string');
        done();
      });
    });

    it('should give status 200 and return json { success: true, descriptor: {...} } if successful', function(done) {

      request(app)
      .post('/api/quiz?descriptor=' + validDescriptorString)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.body.success).to.equal(true);
        expect(res.body.error).to.equal(null);
        expect(res.body.message).to.be.a('string');
        expect(res.body.quiz.descriptor).to.equal(validDescriptorString);
        expect(res.body.quiz.id).to.be.a('number');
        done();
      });
    });

  });

});
describe('GET /api/quiz/:id', function() {

  describe('Unauthenticated User', function() {
    before(function(done) {
        models.sequelize.sync({ force: true }).then(function () {
            server = app.listen(app.get('port'), function() {
                console.log('Node app is running on port', server.address().port);
                done();
            });
        });
    });
    after(function() {
        server.close();
    });
    it('should return 403 Forbidden if user is not authenticated and get IS formatted correctly', function(done) {
      request(app)
      .get('/api/quiz/1')
      .expect(403)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
    });


  });

  describe('Authenticated User', function() {
    before(function(done) {
        models.sequelize.sync({ force: true }).then(function () {
            server = app.listen(app.get('port'), function() {
                console.log('Node app is running on port', server.address().port);
                utils.authenticateTestUser().then(function(user) {
                  testUser = user;
                  done();
                });
            });
        });
    });
    after(function() {
        utils.unauthenticateTestUser();
        server.close();
    });

    it('should return 400 Bad Request if id is not an integer', function(done) {
      request(app)
      .get('/api/quiz/a')
      .expect(400)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
    });

    it('should return 404 not found if quiz does not exist', function(done) {
      request(app)
      .get('/api/quiz/0')
      .expect(404)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
    });

    it('should give status 200 if successful', function(done) {
      request(app)
      .post('/api/quiz?descriptor=' + validDescriptorString)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        request(app)
        .get('/api/quiz/' + res.body.quiz.id)
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.body.success).to.equal(true);
          expect(res.body.error).to.equal(null);
          expect(res.body.quiz.descriptor).to.equal(validDescriptorString);
          expect(res.body.quiz.id).to.be.equal(res.body.quiz.id);
          done();
        });

      });
    });

  });

});



describe('GET /api/quiz', function() {

  describe('Unauthenticated User', function() {
    before(function(done) {
        models.sequelize.sync({ force: true }).then(function () {
            server = app.listen(app.get('port'), function() {
                console.log('Node app is running on port', server.address().port);
                done();
            });
        });
    });
    after(function() {
        server.close();
    });
    it('should return 403 Forbidden if user is not authenticated', function(done) {
      request(app)
      .get('/api/quiz')
      .expect(403)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
    });


  });

  describe('Authenticated User', function() {
    before(function(done) {
        models.sequelize.sync({ force: true }).then(function () {
            server = app.listen(app.get('port'), function() {
                console.log('Node app is running on port', server.address().port);
                utils.authenticateTestUser().then(function(user) {
                  testUser = user;
                  done();
                });
            });
        });
    });
    after(function() {
        utils.unauthenticateTestUser();
        server.close();
    });

    it('should give status 200 if successful and return all items (2 here)', function(done) {
      request(app)
      .post('/api/quiz?descriptor=' + validDescriptorString)
      .expect(200)
      .end(function(err, res) {
        request(app)
        .post('/api/quiz?descriptor=' + validDescriptorString)
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          request(app)
          .get('/api/quiz')
          .expect(200)
          .end(function(err, res) {
            if (err) return done(err);
            expect(res.body.success).to.equal(true);
            expect(res.body.error).to.equal(null);
            expect(res.body.descriptors.length).to.equal(2);
            done();
          });

        });

      });
    });

  });

});



