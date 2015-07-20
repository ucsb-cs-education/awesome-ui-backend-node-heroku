var _und = require("underscore")._;

function isValid(object) {


		if (!(_und.has(object, 'question'))) return false;
		if (typeof(object.question) !== "string") return false;

		if (_und.has(object,'parameters') && typeof(object.parameters) !== "object") return false;

		if (!(_und.has(object, 'repeat'))) return false;
		if (typeof(object.repeat) !== "number") return false;
		if (!(Number.isInteger(object.repeat))) return false;
		if ((object.repeat < 1)) return false;

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


