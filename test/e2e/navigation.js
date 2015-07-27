var chai = require('chai');
var expect = chai.expect;
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var app = require('../../app.js');
var models = require('../../models');
var utils = require('../utils');
var server;

describe('Navigation Bar', function() {

    before(function(done) {
        browser.ignoreSynchronization = true;
        models.sequelize.sync({ force: true }).then(function () {
            server = app.listen(app.get('port'), function() {
                console.log('Node app is running on port', server.address().port);
                done();
            });
        });
    });

    after(function() {
        server.close();
    });


    describe('Navigation Dropdown Menu', function () {

        beforeEach(function(done) {
            browser.get('/');
            utils.waitForElement(element(by.id('navigation-dropdown')));
            browser.findElement(by.id('navigation-dropdown')).click().then(function() {
                done();
            });
        });

        it('should navigate to /student', function(done) {
            element(by.id('navigation-links')).element(by.cssContainingText('a','Student')).click();
            utils.waitForElement(element(by.id('navigation-dropdown')));
            expect(browser.getCurrentUrl()).to.eventually.equal(browser.baseUrl + '/student');
            done();
        });

        it('should navigate to /instructor', function(done) {
            element(by.id('navigation-links')).element(by.cssContainingText('a','Instructor')).click();
            utils.waitForElement(element(by.id('navigation-dropdown')));
            expect(browser.getCurrentUrl()).to.eventually.equal(browser.baseUrl + '/instructor');
            done();
        });
        
        it('should navigate to /author', function(done) {
            element(by.id('navigation-links')).element(by.cssContainingText('a','Author')).click();
            utils.waitForElement(element(by.id('navigation-dropdown')));
            expect(browser.getCurrentUrl()).to.eventually.equal(browser.baseUrl + '/author');
            done();
        });
        
        it('should navigate to /developer', function(done) {
            element(by.id('navigation-links')).element(by.cssContainingText('a','Developer')).click();
            utils.waitForElement(element(by.id('navigation-dropdown')));
            expect(browser.getCurrentUrl()).to.eventually.equal(browser.baseUrl + '/developer');
            done();
        });

    });

    describe('Home Button', function() {

        it('should take us home when home is clicked', function(done) {
            browser.get('/student');
            utils.waitForElement(element(by.id('home-button')));
            browser.findElement(by.id('home-button')).click();
            utils.waitForElement(element(by.id('home-button')));
            expect(browser.getCurrentUrl()).to.eventually.equal(browser.baseUrl + '/');
            done();
        });

    });

    describe('User Dropdown Menu', function () {

        beforeEach(function(done) {
            browser.get(utils.createTestAuthUrl('test', 'id', 'token', 'email', 'Test Name', 'student')).then(function() {
                utils.waitForElement(element(by.id('user-dropdown')));
                browser.findElement(by.id('user-dropdown')).click();
                done();
            });
        });

        afterEach(function(done) {
            browser.get('/logout');
            done();
        });

        it('should navigate to the /usersettings page', function(done) {
            element(by.id('user-links')).element(by.cssContainingText('a','Settings')).click();
            utils.waitForElement(element(by.id('user-dropdown')));
            expect(browser.getCurrentUrl()).to.eventually.equal(browser.baseUrl + '/usersettings');
            done();
        });

        it('should log out using the user dropdown', function(done) {
            element(by.id('user-links')).element(by.cssContainingText('a','Sign Out')).click();
            utils.waitForElement(element(by.id('navigation-dropdown')));
            expect(browser.getCurrentUrl()).to.eventually.equal(browser.baseUrl + '/');
            done();
        });

    });
});

















