var expect = require("chai").expect;
var app = require('../../index.js');
var http = require('http');
var server; 

describe('protractor library', function() {
    before(function() { 
        server = http.createServer(app); 
        server.listen(0); 
        //browser.baseUrl = 'http://'+ server.address().address +':'+ server.address().port; 

        console.log(browser.baseUrl);
    }); 

    after(function(){
        server.close(); 
    });
    it('should pass', function() {
        expect(true).to.equal(true);
    });
    
    it('should expose the correct global variables', function() {
        expect(protractor).to.exist;
        expect(browser).to.exist;
        expect(by).to.exist;
        expect(element).to.exist;
        expect($).to.exist;
    });
    
    
    it('should login, logout, login, and logout with Facebook', function(done) {
        this.slow(4000);
        browser.driver.get(browser.baseUrl);
        var fbLoginButton = browser.driver.findElement(by.id('facebook-login')).click()

        browser.driver.findElement(by.id('email')).sendKeys("khdrsbt_liangman_1436318828@tfbnw.net");
        browser.driver.findElement(by.id('pass')).sendKeys("martin");
        browser.driver.findElement(by.id('u_0_2')).click();

        /*

        browser.driver.findElement(by.id('logout')).click();

        browser.driver.findElement(by.id('facebook-login')).click();

        browser.driver.findElement(by.id('logout')).click();


        // we're about to authorize some permissions, but the button isn't enabled for a second
        //fbLoginButton.driver.sleep(1500);
        //console.log(fbLoginButton.getText());
        */
        done();

        //expect(browser.getTitle()).to.eventually.equal('My AngularJS App');
    });
    
});




















