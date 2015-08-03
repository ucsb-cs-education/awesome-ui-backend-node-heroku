var models = require('../../models');
var projectAwesome = require("project-awesome");

function isValidId(n) {
	return /^\d+$/.test(n);
}

module.exports = function(app) {

    app.get('/api/quiz/:id', function(req, res) {
        if (!isValidId(req.params.id)) {
            res.status(400).end();
            return;
        }
        var seed = '00000001';
        if (req.query.s) {
        	if (!projectAwesome.isStringValidSeed(req.query.s)) {
        		res.status(400).end();
        		return;
        	}
            seed = req.query.s;
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











