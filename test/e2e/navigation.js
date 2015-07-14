var app = require('../../index.js');
var chai = require('chai');
var expect = chai.expect;
var chaiAsPromised = require('chai-as-promised');
var testUtils = require('../utils');
chai.use(chaiAsPromised);


before(function(done) {
    browser.ignoreSynchronization = false;
    browser.get('/').then(function() {
        browser.waitForAngular();
        done();
    });
});

describe('Navigation Bar', function() {
    var expectPages = ['/student', '/instructor', '/author', '/developer'];

    beforeEach(function(done) {
        browser.get('/').then(function() {
            done();
        });
    });

    describe('Navigation Dropdown Menu', function () {

        it('should have 4 pages', function(done) {
            var navLinks = element(by.id('navigation-links')).all(by.css('a'));
            expect(navLinks.count()).to.eventually.equal(expectPages.length);
            done();
        });

        it('should should take us to the given page when an item is clicked', function(done) {
            for (var i = 0; expectPages.length > i; i++) {
                browser.findElement(by.css('.dropdown')).click();
                var navLink = element(by.id('navigation-links')).all(by.css('a')).get(i);
                navLink.click();
                expect(browser.getCurrentUrl()).to.eventually.equal(browser.baseUrl + expectPages[i]);
            }
            done();
        });
    });

    describe('User Dropdown Menu', function () {
        beforeEach(function(done) {
            browser.get(testUtils.createTestAuthUrl('test', 'id', 'token', 'email', 'Test Name')).then(function() {
                done();
            });
        });

        afterEach(function(done) {
            browser.get('/logout');
            done();
        });

        it('should have logged the user in', function(done) {
            browser.findElement(by.id('logout'));
            done();
        });
    });

    describe('Home Button', function () {

        it('should take us home when home is clicked', function(done) {
            browser.get('/student');
            browser.findElement(by.id('home-button')).click();
            expect(browser.getCurrentUrl()).to.eventually.equal(browser.baseUrl + '/');
            done();
        });
    });

});

















