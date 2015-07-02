var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var configAuth = require('./auth');

module.exports = function(passport, models) {


    // Session Setup

    // serializes user for session
    passport.serializeUser(function(user, done) {
        done(null, user.awesome_id);
    });

    // deserializes user
    passport.deserializeUser(function(id, done) {
        models.User.findOne({
          where: {awesome_id: id}
        }).then(function(user) {
            done(null, user);
        }).catch(function(error) {
            done(error, null);
        });
    });

}