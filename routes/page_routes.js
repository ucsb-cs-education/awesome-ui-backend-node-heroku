module.exports = function(app) {

	app.get('/', function(request, response) {
		var fullUrl = request.protocol + '://' + request.get('host') + request.originalUrl;
		console.log(fullUrl);
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

}