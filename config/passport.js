var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;



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


    // Used by google and facebook authentication results
    function authResult(type, token, refreshToken, profile, done) {
        // try to find the user based on their id
        models.User.findOne({
          where: { id: profile.id, account_type: type }
        }).then(function(user) {
          if (user) {
            console.log(user.name + " is already in the database.");
            return done(null, user);
          } else {
            console.log(profile.id + " " + type + " is new, adding new user.");
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

    // GOOGLE ============================================================
    passport.use(new GoogleStrategy({
        clientID : process.env.GOOGLE_APP_ID,
        clientSecret : process.env.GOOGLE_APP_SECRET,
        callbackURL : process.env.GOOGLE_CALLBACK_URL
    },
    function(token, refreshToken, profile, done) {
        // asynchronous
        process.nextTick(function() {
            authResult("google", token, refreshToken, profile, done);
        });

    }));

    // FACEBOOK ==========================================================
    passport.use(new FacebookStrategy({
        clientID        : process.env.FACEBOOK_APP_ID,
        clientSecret    : process.env.FACEBOOK_APP_SECRET,
        callbackURL     : process.env.FACEBOOK_CALLBACK_URL
    },
    function(token, refreshToken, profile, done) {
        // asynchronous
        process.nextTick(function() {
            profile.displayName = profile.name.givenName + " " + profile.name.familyName;
            authResult("facebook", token, refreshToken, profile, done);
        });

    }));


}




