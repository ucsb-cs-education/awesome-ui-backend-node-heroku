module.exports = function(app, passport) {
    var successRedirectUrl = '/';
    var failureRedirectUrl = '/fail';

    // FACEBOOK authentication routes
    app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

    // after facebook authenticates
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect : successRedirectUrl,
            failureRedirect : failureRedirectUrl
        }
    ));

    // GOOGLE authentication routes
	app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

    // after google authenticates
    app.get('/auth/google/callback',
		passport.authenticate('google', {
			successRedirect : successRedirectUrl,
			failureRedirect : failureRedirectUrl
		}
	));

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    // TEST authenticaiton routes
    if (process.env.NODE_ENV != 'production') {
        app.get('/auth/test/callback', passport.authenticate('local-login', {
            successRedirect : successRedirectUrl,
            failureRedirect : failureRedirectUrl
        }));
    }

}








