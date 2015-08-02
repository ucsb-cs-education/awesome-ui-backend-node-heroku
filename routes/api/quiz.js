var models = require('../../models');
var projectAwesome = require("project-awesome");

function isPositiveInteger(x) {
    return (typeof x === 'number') && (x % 1 === 0) && x >= 0;
}

function isValidId(n) {
	return /^\d+$/.test(n);
}

module.exports = function(app) {

    app.get('/api/quiz/:id', function(req, res) {
        if (!isValidId(req.params.id)) {
            res.status(400).end();
            return;
        }
        //?s=seed
        var seed = 1;
        if (req.query.s) {
        	if (!isValidId(req.query.s)) {
        		res.status(400).end();
        		return;
        	}
            seed = parseInt(req.query.s);
        }

        models.QuizDescriptor.findOne({ where: {id: req.params.id} }).then(function(qd) {
            if (!qd) {
                res.status(404).end();
            } else {
            	var quiz = projectAwesome.QuizBuilder.build(qd.descriptor, qd.id, seed);
            	res.json(quiz);
            }
        });
        
    });

}











