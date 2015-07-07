module.exports = function(app, passport) {

	app.get('/', function(request, response) {
		response.render('pages/index', { user : request.user })
	});

	app.get('/student', function(request, response) {
		response.render('pages/student', { user : request.user })
	});

	app.get('/instructor', function(request, response) {
		response.render('pages/instructor', { user : request.user } )
	});

	app.get('/author', function(request, response) {
		response.render('pages/author', { user : request.user })
	});

	app.get('/developer', function(request, response) {
		response.render('pages/developer', { user : request.user })
	});

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

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


}