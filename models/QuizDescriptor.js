
var _und = require("underscore")._;
var QuizDescriptorQuestion = require('./QuizDescriptorQuestion.js');
var isValidQuestion = QuizDescriptorQuestion.isValid;

function isValid(object) {

		if (!(_und.has(object, 'version'))) return false;
		if (typeof(object.version) !== "string") return false;

		if (!(_und.has(object, 'title'))) return false;
		if (typeof(object.title) !== "string") return false;

		if (!(_und.has(object, 'quiz'))) return false;
		if (!(Array.isArray(object.quiz))) return false;

		if (object.quiz.length <= 0) return false;

		for (var i=0; i<object.quiz.length; i++) {
			console.log("object.quiz[i] = " + JSON.stringify(object.quiz[i]));
		    if (!(isValidQuestion(object.quiz[i]))) return false;
		} 

		return true;
    };

function isValidJSON(s) {

    	var object;
    	try {
    	   object = JSON.parse(s);
    	} catch (e) {
    		return false;
    	}

    	return isValid(object);

    };



module.exports.isValid = isValid;
module.exports.isValidJSON = isValidJSON;