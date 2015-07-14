var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = chai.expect;
var app = require('../../index.js');

describe('End-to-End Tests', function() {
    before(function() { 
        browser.ignoreSynchronization = true;
    }); 

    after(function() {

    });

    describe('Protractor and Selenium', function () {

        it('should expose the correct protractor global variables', function() {
            expect(protractor).to.exist;
            expect(browser).to.exist;
            expect(by).to.exist;
            expect(element).to.exist;
            expect($).to.exist;
        });
        
        it('should complete a get request to google, and confirm the title', function(done) {
            browser.get('http://google.com');
            expect(browser.getTitle()).to.eventually.eq('Google');
            done();
        });

    });

    describe('Facebook Authenticated', function () {
        it('should login, logout, login, and logout, using Facebook', function(done) {
            browser.get('/');
            browser.findElement(by.id('facebook-login')).click();
            browser.findElement(by.id('email')).sendKeys(process.env.FACEBOOK_TEST_EMAIL);
            browser.findElement(by.id('pass')).sendKeys(process.env.FACEBOOK_TEST_PASSWORD);
            browser.findElement(by.id('u_0_2')).click();

            element(by.name('__CONFIRM__')).isPresent().then(function(result) {
                if ( result ) {
                    browser.findElement(by.name('__CONFIRM__')).click();
                    browser.sleep(1000);
                }
            });
            browser.findElement(by.id('logout')).click();
            browser.findElement(by.id('facebook-login')).click();
            browser.findElement(by.id('logout')).click();
            done();
        });
    });

    
});





















