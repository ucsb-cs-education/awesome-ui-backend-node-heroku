var express = require('express');
var app = express();
var passport = require('passport');
var session = require('express-session');
var bodyParser = require('body-parser');
var models = require("./models");

models.sequelize.sync({ force: true }).then(function () {
  
});

// Refreshing the page sometimes rendered an empty html page. app.disable('etag'); fixes it.
app.disable('etag');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));


// passport initialization
app.use(session( { 
	secret: 'somesecretforprojectawesomechangethismaybe',
	resave: true,
	saveUninitialized: true
} ));
app.use(passport.initialize());
app.use(passport.session());





require('./config/passport.js')(passport, models);



// routes ======================================================================
require('./routes.js')(app, passport, models);


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

// Exports application for testing
module.exports = app;


