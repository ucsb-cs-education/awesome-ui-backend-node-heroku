//var app = require('../../index.js');
var chai = require('chai');
var expect = chai.expect;
var chaiAsPromised = require('chai-as-promised');
var testUtils = require('../utils');
chai.use(chaiAsPromised);

var app = require('../../app.js');
var models = require('../../models');
var server;


describe('Navigation Bar', function() {

    before(function(done) {
        browser.ignoreSynchronization = true;
        models.sequelize.sync({ force: true }).then(function () {
            server = app.listen(app.get('port'), function() {
                console.log('Node app is running on port', server.address().port);
                browser.get('/').then(function() {
                    done();
                });
            });
        });
    });

    after(function() {
        server.close();
    });


    describe('Navigation Dropdown Menu', function () {
        beforeEach(function(done) {
            browser.findElement(by.id('navigation-dropdown')).click().then(function() {
                done();
            });
        });
        afterEach(function(done) {
            done();
        });

        it('should navigate to /student', function(done) {
            element(by.id('navigation-links')).element(by.cssContainingText('a','Student')).click();
            //expect(browser.getCurrentUrl()).to.eventually.equal(browser.baseUrl + '/student');
            done();
        });

        it('should navigate to /instructor', function(done) {
            element(by.id('navigation-links')).element(by.cssContainingText('a','Instructor')).click();
            //expect(browser.getCurrentUrl()).to.eventually.equal(browser.baseUrl + '/instructor');
            done();
        });
        
        it('should navigate to /author', function(done) {
            element(by.id('navigation-links')).element(by.cssContainingText('a','Author')).click();
            //expect(browser.getCurrentUrl()).to.eventually.equal(browser.baseUrl + '/author');
            done();
        });
        
        it('should navigate to /developer', function(done) {
            element(by.id('navigation-links')).element(by.cssContainingText('a','Developer')).click();
            //expect(browser.getCurrentUrl()).to.eventually.equal(browser.baseUrl + '/developer');
            done();
        });

    });
});

















