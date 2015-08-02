var request = require('supertest');
var expect = require("chai").expect;
var utils = require("../../utils");

var app = require('../../../app.js');
var models = require('../../../models');

var projectAwesome = require("project-awesome");

var validDescriptor= utils.validDescriptor;
var server;

describe('Quiz API', function() {

  before(function(done) {
      models.sequelize.sync({ force: true }).then(function () {
          server = app.listen(app.get('port'), function() {
            done();
          });
      });
  });

  after(function(done) {
      server.close();
      done();
  });



  describe('GET /api/quiz/:id?s=seed', function() {
    var qd = {};
    before(function(done) {
      models.sequelize.sync({ force: true }).then(function () {
        utils.insertQuizDescriptor(models, 'Sample Quiz Descriptor').then(function(newQD) {
          qd = newQD;
          done();
        });
      });
    });

    it('should respond with 400 Bad Request if the id param is not valid', function(done) {
        request(app)
        .get('/api/quiz/a')
        .expect(400)
        .end(done);
    });

    it('should respond with 400 Bad Request if the seed is not a positive integer', function(done) {
        request(app)
        .get('/api/quiz/'+qd.id+'?s=1.1')
        .expect(400)
        .end(done);
    });

    it('should respond with 200 and a valid json quiz corresponding to seed=1 if seed is not specified', function(done) {
        request(app)
        .get('/api/quiz/'+qd.id)
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          expect(projectAwesome.QuizValidator.isValid(res.body)).to.be.true;
          expect(res.body.seed).to.equal(1);
          done();
        });
    });

    it('should respond with 200 and a valid json quiz and return the quiz give the correct seed', function(done) {
        request(app)
        .get('/api/quiz/'+qd.id+'?s=100')
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          expect(projectAwesome.QuizValidator.isValid(res.body)).to.be.true;
          expect(res.body.seed).to.equal(100);
          done();
        });
    });

  });
});




















