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


    // GOOGLE ============================================================
    passport.use(new GoogleStrategy({
        clientID : configAuth.googleAuth.clientID,
        clientSecret : configAuth.googleAuth.clientSecret,
        callbackURL : configAuth.googleAuth.callbackURL
    },
    function(token, refreshToken, profile, done) {

        // make the code asynchronous
        // Database query will wait until we have all our data back from Google
        process.nextTick(function() {
            // try to find the user based on their google id
            models.User.findOne({
              where: { id: profile.id, account_type: "google" }
            }).then(function(user) {
              if (user) {
                return done(null, user);
              } else {
                models.User.create({
                    account_type : "google",
                    id: profile.id,
                    token: token,
                    email: profile.emails[0].value,
                    name: profile.displayName
                }).then(function(createdUser) {
                    return done(null, createdUser);
                }); // don't catch error
              }
            }).catch(function(error) {
                return done(error);
            });
            
        });

    }));


}




