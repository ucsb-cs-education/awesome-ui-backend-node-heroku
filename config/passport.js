var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
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



    function authResult(type, token, refreshToken, profile, done) {
        // try to find the user based on their id
        models.User.findOne({
          where: { id: profile.id, account_type: type }
        }).then(function(user) {
          if (user) {
            return done(null, user);
          } else {
            models.User.create({
                account_type : type,
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
    }


    // FACEBOOK ==========================================================
    passport.use(new FacebookStrategy({

        // pull in our app id and secret from our auth.js file
        clientID        : configAuth.facebookAuth.clientID,
        clientSecret    : configAuth.facebookAuth.clientSecret,
        callbackURL     : configAuth.facebookAuth.callbackURL

    },

    // facebook will send back the token and profile
    function(token, refreshToken, profile, done) {

        // asynchronous
        process.nextTick(function() {
            profile.displayName = profile.name.givenName + " " + profile.name.familyName;
            authResult("facebook", token, refreshToken, profile, done);
        });

    }));

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
            authResult("google", token, refreshToken, profile, done);
        });

    }));


}




