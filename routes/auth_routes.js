module.exports = function(app, passport) {

    // FACEBOOK authentication routes
    app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

    // after facebook authenticates
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect : '/',
            failureRedirect : '/fail'
        }
    ));

    // GOOGLE authentication routes
	app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

    // after google authenticates
    app.get('/auth/google/callback',
		passport.authenticate('google', {
			successRedirect : '/',
			failureRedirect : '/fail'
		}
	));

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });


}