var app = require('./app.js');
var models = require("./models");

models.sequelize.sync({ force: true }).then(function () {
  var server = app.listen(app.get('port'), function() {
    //debug('Express server listening on port ' + server.address().port);
  	console.log('Node app is running on port', server.address().port);
  });
});

