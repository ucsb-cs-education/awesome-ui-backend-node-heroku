var models = require('../../models');
var mod = require("project-awesome");
module.exports = function(app) {
    
    app.post('/api/quiz', function(req, res) {
        if (!req.isAuthenticated()) {
            res.status(403).end();
            return;
        } else if (!req.query.descriptor) {
            res.status(400).end();
            return;
        } else if (!mod.isValidQuizDescriptorJSON(req.query.descriptor)) {
            res.status(400).end();
            return;
        }

        models.User.findOne({ where: {awesome_id: req.user.awesome_id} }).then(function(user) {
            if (user) {
                user.createQuizDescriptor({descriptor: req.query.descriptor}).then(function(qd) {
                    res.json(qd);
                }).catch(function(error) {
                    res.status(500).end();
                })
            }
        });
        
    });

    function isValidId(n){
        return /^\d+$/.test(n);
    }
    app.get('/api/quiz/:id', function(req, res) {
        if (!req.isAuthenticated()) {
            res.status(403).end();
            return;
        } else if (!isValidId(req.params.id)) {
            res.status(400).end();
            return;
        }


        models.User.findOne({ where: {awesome_id: req.user.awesome_id} }).then(function(user) {
            if (user) {
            user.getQuizDescriptors({ where: {id: req.params.id } }).then(function(qd) {
                if (!qd || qd.length < 1) {
                    res.status(404).end();
                } else {
                    res.json(qd[0]);
                }
            });
            }
        });
        
    });

    app.get('/api/quiz', function(req, res) {
        if (!req.isAuthenticated()) {
            res.status(403).end();
            return;
        }


        models.User.findOne({ where: {awesome_id: req.user.awesome_id} }).then(function(user) {
            if (user) {
            user.getQuizDescriptors().then(function(descriptors) {
                if (!descriptors) {
                    res.status(404).end();
                } else {
                    res.json(descriptors);
                }
            });
            }
        });
        
    });

}