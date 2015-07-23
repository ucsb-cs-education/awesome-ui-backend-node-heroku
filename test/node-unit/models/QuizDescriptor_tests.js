var expect = require("chai").expect;
var models = require('../../../models');

 var testUser;


describe('QuizDescriptor', function() {

  beforeEach(function(done) {
    models.sequelize.sync({ force: true }).then(function() {
      models.User.create({ 
        account_type: "google",
        id: "some_id",
        token: "some token",
        email: "some@email.com",
        name: "Some Name",
        role: "author"
      }).then(function(user) {
        testUser = user;
        done();
      });
    });
  });

  it('shouldcreate a quiz descriptor', function(done){
    models.QuizDescriptor.create({descriptor: '{test!}'}).then(function(qd) {
      done();
    });
  });

  it('should use the testUser to create a quiz descriptor', function(done){
    testUser.createQuizDescriptor({descriptor: '{test!}'}).then(function(qd) {
      done();
    });
  });

  it('should create one quiz descriptor for user, and retrieve all expecting 1', function(done){
    testUser.createQuizDescriptor({descriptor: '{test!}'}).then(function(qd) {
      testUser.getQuizDescriptors().then(function(results) {
        expect(results.length).to.equal(1);
        done();
      });
    });
  });

  it('should create two quiz descriptor for user, and retrieve all expecting 2', function(done){
    testUser.createQuizDescriptor({descriptor: '{test!}'}).then(function(qd1) {
      testUser.createQuizDescriptor({descriptor: '{test!}'}).then(function(qd2) {
        testUser.getQuizDescriptors().then(function(results) {
          expect(results.length).to.equal(2);
          done();
        });
      });
    });
  });

});








