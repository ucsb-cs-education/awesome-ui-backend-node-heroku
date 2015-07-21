var models = require('../../models');
var mod = require("project-awesome");
module.exports = function(app) {



    // 
    app.post('/api/quiz', function(req, res) {
        if (!req.isAuthenticated()) {
            res.status(403).end();
            return;
        } else if (!req.query.descriptor || !mod.isValidQuizDescriptorJSON(req.query.descriptor)) {
            res.status(400).end();
            return;
        }

        models.User.findOne({ where: {awesome_id: req.user.awesome_id} }).then(function(user) {
            if (user) {
                user.createQuizDescriptor({descriptor: req.query.descriptor}).then(function(qd) {
                    res.json({ success: true, error: null, message: "Created quiz descriptor.", quiz: qd });
                }).catch(function(error) {
                    res.json({ success: false, error: error, message: "Error."});
                })
            }
        });
        
    });

}