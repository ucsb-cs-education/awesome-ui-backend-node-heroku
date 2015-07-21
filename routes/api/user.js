var models = require('../../models');
module.exports = function(app) {

    // 
    app.put('/api/user/:awesome_id', function(req, res) {
        if (!req.isAuthenticated() || req.user.awesome_id != req.params.awesome_id) {
            res.status(403).end();
            return;
        } else if (!req.query.role || (req.query.role != 'student' && req.query.role != 'instructor' && req.query.role != 'author' && req.query.role != 'developer')) {
            res.status(400).end();
            return;
        }

        
        models.User.findOne({ where: {awesome_id: req.params.awesome_id} }).then(function(user) {
            if (user) { // if the record exists in the db
                
                user.updateAttributes({
                    role: req.query.role
                }).then(function(user) {
                    res.json({ success: true, error: null, message: "Updated User" });
                }).catch(function(error) {
                    res.json({ success: false, error: error, message: "Error" });
                })
            }
        });
        
    });

}








