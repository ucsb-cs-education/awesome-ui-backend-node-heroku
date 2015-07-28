var models = require('../models');

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

module.exports = function(app) {

	app.get('/', function(req, res) {
		res.render('pages/index', { user : req.user });
	});

	app.get('/student', function(req, res) {
		res.render('pages/student', { user : req.user });
	});

	app.get('/instructor', function(req, res) {
		res.render('pages/instructor', { user : req.user } );
	});

	app.get('/author', function(req, res) {
		res.render('pages/author', { user : req.user });
	});

	app.get('/developer', function(req, res) {
		res.render('pages/developer', { user : req.user });
	});

	app.get('/usersettings', redirectUnauthenticatedToLogin, function(req, res) {
		res.render('pages/usersettings', { user : req.user });
	});

	app.get('/quizdescriptor/:id', function(req, res) {
		models.QuizDescriptor.findOne({ where: {id: req.params.id} })
		.then(function(qd) {
			if (qd) {
				qd.descriptor = JSON.parse(qd.descriptor);
				res.render('pages/quizdescriptor', { user : req.user, qd : qd });
			} else {
				res.status(404).send('Sorry cant find that!');
			}
		}, function(error) {
			res.status(404).send('Sorry cant find that!');
		});
		
	});

	app.get('/login', redirectAuthenticatedToPreferred, function(req, res) {
		res.render('pages/login', { user : req.user });
	});
}









