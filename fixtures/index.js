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

var fixtures = testQuizDescriptors.map(function(qd) {
    return {
        model: 'QuizDescriptor',
        data: {
            descriptor: JSON.stringify(qd)
        }
    }
});

module.exports.loadFixtures = function(models) {
  sequelize_fixtures.loadFixtures(fixtures, models).then(function(){
      console.log("Added " + testQuizDescriptors.length + " QuizDescriptor fixtures to db.")
  });
}
