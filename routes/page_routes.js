module.exports = function(app) {

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

	app.get('/usersettings', redirectUnauthenticatedToLogin, function(request, response) {
		response.render('pages/usersettings', { user : request.user })
	});

	app.get('/login', redirectAuthenticatedToPreferred, function(request, response) {
		response.render('pages/login', { user : request.user })
	});
}


function redirectUnauthenticatedToLogin(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/login');
}

function redirectAuthenticatedToPreferred(req, res, next) {
    if (!req.isAuthenticated())
        return next();
    res.redirect('/' + req.user.role);
}







