var models = require('../../models');
var projectAwesome = require("project-awesome");
module.exports = function(app) {
    
    app.post('/api/qd', function(req, res) {
        if (!req.isAuthenticated()) {
            res.status(403).end();
            return;
        } else if (!req.query.descriptor) {
            res.status(400).end();
            return;
        } else if (!projectAwesome.isValidQuizDescriptorJSON(req.query.descriptor)) {
            res.status(400).end();
            return;
        }

        models.User.findOne({ where: {awesome_id: req.user.awesome_id} }).then(function(user) {
            if (user) {
                user.createQuizDescriptor({descriptor: req.query.descriptor}).then(function(qd) {
                    qd.descriptor = JSON.parse(qd.descriptor);
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
    
    app.get('/api/qd/:id', function(req, res) {
        if (!isValidId(req.params.id)) {
            res.status(400).end();
            return;
        }


        models.QuizDescriptor.findOne({ where: {id: req.params.id} }).then(function(qd) {
            if (!qd) {
                res.status(404).end();
            } else {
                qd.descriptor = JSON.parse(qd.descriptor);
                res.json(qd);
            }
        });
        
    });

    app.get('/api/qd', function(req, res) {

        models.QuizDescriptor.findAll().then(function(qds) {
                    if (!qds) {
                        res.status(500).end();
                    } else {
                        for (var i = 0; qds.length > i; i++) {
                            qds[i].descriptor = JSON.parse(qds[i].descriptor);
                        }
                        res.json(qds);
                    }
                });
        
    });

}

