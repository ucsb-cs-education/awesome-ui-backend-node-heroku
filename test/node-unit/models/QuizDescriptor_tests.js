var expect = require("chai").expect;

var _und = require("underscore")._;

var QuizDescriptor = require('../../../models/QuizDescriptor.js');

describe('QuizDescriptor Model', function() {

  var isValid = QuizDescriptor.isValid;
  var isValidJSON = QuizDescriptor.isValidJSON;

  var notEvenJSONStrings = ['bar','}{','<>'];

  it('should know that strings that aren\'t even JSON are invalid', function(){
   notEvenJSONStrings.forEach( function (s) {
    expect(isValidJSON(s)).to.be.false;
    });
  });

  var validDescriptorWithTwoQuestions = 
  {
    "version" : "0.1",
    "title" : "Example QuizJSON 1",
    "quiz": 
    [
    {
      "question": "numberConversions",
      "parameters": {"questionType": "bin2hex", "minValue": 0, "maxValue": 255},
      "repeat": 5
    },
    {
      "question": "orderOfOperations",
      "parameters": {"numOperators": 2},
      "repeat": 5
    },
    ] 
  };

  it('should know that a valid QuizDescriptor with two questions is valid', function(){	
   expect(isValid(validDescriptorWithTwoQuestions)).to.be.true;
  });  

  it('should know that the JSON reprsentation of valid QuizDescriptor with two questions is valid', function(){ 
   expect(isValidJSON(JSON.stringify(validDescriptorWithTwoQuestions))).to.be.true;
  });  

  var validDescriptorWithOneQuestion = 
  {
    "version" : "0.1",
    "title" : "Example QuizJSON 2",
    "quiz": 
    [ 
    {
     "question": "orderOfOperations",
     "repeat": 5
    },
   ] 
  };

 it('should know that a valid QuizDescriptor with one question is valid', function(){	
   expect(isValid(validDescriptorWithOneQuestion)).to.be.true;
  });

 it('should know that the JSON for a valid QuizDescriptor with one question is valid', function(){ 
   expect(isValidJSON(JSON.stringify(validDescriptorWithOneQuestion))).to.be.true;
  });


 it('should know that an empty object quiz descriptor is invalid', function(){
   expect(isValid(JSON.stringify({}))).to.be.false;
  });

 it('should know that an empty object quiz descriptor is invalid', function(){
   expect(isValid(JSON.stringify({"foo":"bar"}))).to.be.false;
  });


 it('should know that a QuizDescriptor must have a version', function(){
   var d = _und.clone(validDescriptorWithOneQuestion);
   delete d.version;
   expect(isValid(d)).to.be.false;
 });

 it('should know that a QuizDescriptor version must be a string', function(){
   var d = _und.clone(validDescriptorWithOneQuestion);
   d.version = false;
   expect(isValid(d)).to.be.false;
 });

 it('should know that a QuizDescriptor descriptor must have a title', function(){
   var d = _und.clone(validDescriptorWithOneQuestion);
   delete d.title;
   expect(isValid(d)).to.be.false;
 });

 it('should know that a QuizDescriptor title must be a string', function(){
   var d = _und.clone(validDescriptorWithOneQuestion);
   d.title = false;
   expect(isValid(d)).to.be.false;
 });

 it('should know that a QuizDescriptor descriptor must have a quiz', function(){
   var d = _und.clone(validDescriptorWithOneQuestion);
   delete d.quiz;
   expect(isValid(d)).to.be.false;
 });

 it('should know that a QuizDescriptor quiz must be an Array', function(){
   var d = _und.clone(validDescriptorWithOneQuestion);
   d.quiz = false;
   expect(isValid(d)).to.be.false;
 });

 it('should know that a QuizDescriptor quiz Array must not be empty', function(){
   var d = _und.clone(validDescriptorWithOneQuestion);
   d.quiz = [];
   expect(isValid(d)).to.be.false;
 });

 it('should know that a QuizDescriptor quiz Array must not consist of just one bad question', function(){
   var d = _und.clone(validDescriptorWithOneQuestion);
   d.quiz = [{"foo":"bar"}];
   expect(isValid(d)).to.be.false;
 });

 it('should know that a QuizDescriptor quiz Array must not have a bad question tacked on after some good ones', function(){
   var d = _und.clone(validDescriptorWithOneQuestion);
   d.quiz.push({"foo":"bar"});
   expect(isValid(d)).to.be.false;
 });

});

// Mocha cheatsheet
/*
describe('test suite', function () {
  beforeEach(function() { 
  	// ...
  });
  afterEach(function() { 
  	// ...
  });

  before(function() { 
  	// ...
  });
  after(function() { 
  	// ...
  });

  it('a basic test', function() { 
  	// ...
  });

  it('a test with a promise', function() {
    return somePromiseObject; });

  it('an asynchronous test', function(next) {
    if (success) { next(); } else { next(error); }
  });

  xit('use "xit" for pending tests', function() { 
  	// ...
  });
});
*/

// Chai cheatsheet
/*
expect(3).to.eql(2);

expect(obj).to.be.a('string');
expect(obj).to.be.null;
expect(obj).to.be.true;
expect(obj).to.be.false;
expect(obj).to.be.undefined;

expect(list).to.include("item");
expect(list).to.have.length(3);
expect(list).to.have.length.gt(0);
*/


