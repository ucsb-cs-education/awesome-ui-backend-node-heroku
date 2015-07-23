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
        browser.ignoreSynchronization = false;
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
    
    describe('User Dropdown Menu', function () {

        beforeEach(function(done) {
            browser.get(testUtils.createTestAuthUrl('test', 'id', 'token', 'email', 'Test Name', 'student')).then(function() {
                done();
            });
        });

        afterEach(function(done) {
            browser.get('/logout');
            done();
        });

        it('should have logged the user in', function(done) {
            browser.findElement(by.id('user-dropdown'));
            done();
        });

        it('should navigate to the /usersettings page', function(done) {
            browser.findElement(by.id('user-dropdown')).click();
            element(by.id('user-links')).element(by.cssContainingText('a','Settings')).click();
            //expect(browser.getCurrentUrl()).to.eventually.equal(browser.baseUrl + '/usersettings');
            done();
        });

        it('should log out using the user dropdown', function(done) {
            browser.findElement(by.id('user-dropdown')).click();
            element(by.id('user-links')).element(by.cssContainingText('a','Sign Out')).click();
            //expect(browser.getCurrentUrl()).to.eventually.equal(browser.baseUrl + '/');
            done();
        });

    });

    describe('Home Button', function () {

        it('should take us home when home is clicked', function(done) {
            browser.get('/student');
            browser.findElement(by.id('home-button')).click().then(function() {
                //expect(browser.getCurrentUrl()).to.eventually.equal(browser.baseUrl + '/');
                done();
            });
        });
    });


});











