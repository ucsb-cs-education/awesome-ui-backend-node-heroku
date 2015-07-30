var chai = require('chai');
var expect = chai.expect;
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var app = require('../../app.js');
var models = require('../../models');
var utils = require('../utils');
var server;

describe('Routes', function() {

    before(function(done) {
        models.sequelize.sync({ force: true }).then(function () {
            server = app.listen(app.get('port'), function() {
            	browser.get('/').then(function() {
                	done();
            	});
            });
        });
    });

    after(function(done) {
        server.close();
        done();
    });

	describe('/instructor', function() {
		
	});



});



















