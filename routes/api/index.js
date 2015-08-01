module.exports = function(app) {

	require('./user')(app);
	require('./qd')(app);
	require('./quiz')(app);
	app.get('/api/*', function(req, res) {
        res.status(404).end();
    });

}








