module.exports = function(app, passport, models) {

	app.get('/', function(request, response) {
		response.render('pages/index')
	});

	app.get('/student', function(request, response) {
		response.render('pages/student')
	});

	app.get('/instructor', function(request, response) {
		response.render('pages/instructor')
	});

	app.get('/author', function(request, response) {
		response.render('pages/author')
	});

	app.get('/developer', function(request, response) {
		response.render('pages/developer')
	});





	app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

    // the callback after google has authenticated the user
    app.get('/auth/google/callback',
    	passport.authenticate('google', {
    		successRedirect : '/',
    		failureRedirect : '/fail'
    	}));


}