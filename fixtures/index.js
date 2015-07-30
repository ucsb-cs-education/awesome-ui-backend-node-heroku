var sequelize_fixtures = require('sequelize-fixtures');
var models = require('../models');
var testQuizDescriptors = [
    {
      "version" : "0.1",
      "title" : "Fixture Example Quiz",
      "quiz": [{
        "question": "orderOfOperations",
           "repeat": 5
       }] 
    } 
];

var quizDescriptorFixtures = [
    { 
        descriptor : {
        "version" : "0.1",
        "title" : "First Fixture Example Quiz",
        "quiz": [{
          "question": "orderOfOperations",
             "repeat": 1
         }] 
      }
    },
    { 
      descriptor : {
        "version" : "0.1",
        "title" : "Second Fixture Example Quiz",
        "quiz": [{
          "question": "orderOfOperations",
             "repeat": 2
         }] 
      }
    }, 
    {
      descriptor : {
        "version" : "0.1",
        "title" : "Third Fixture Example Quiz",
        "quiz": [{
          "question": "orderOfOperations",
             "repeat": 3
         }] 
      }
    }
];



module.exports.loadAllFixtures = function(models) {
  for (var i = 0; quizDescriptorFixtures.length > i; i++) {
      models.QuizDescriptor.create(quizDescriptorFixtures[i]);
  }
}

















