module.exports = function(app, passport) {
	require('./page_routes')(app);
	require('./auth_routes')(app, passport);
}