module.exports = function(app, passport, models) {

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

	app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

    // the callback after google has authenticated the user
    app.get('/auth/google/callback',
    	passport.authenticate('google', {
    		successRedirect : '/',
    		failureRedirect : '/fail'
    	}));


}