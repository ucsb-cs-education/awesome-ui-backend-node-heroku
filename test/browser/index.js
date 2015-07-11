var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = chai.expect;
var app = require('../../index.js');
var http = require('http');
var server; 

describe('protractor library', function() {
    before(function() { 
        browser.ignoreSynchronization = true;
        server = http.createServer(app); 
        server.listen(0);
        console.log(browser.baseUrl);
        console.log(app.get('port'));
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
    
    it('should go to google.com and make sure the title is Google', function(done) {
        //this.slow(4000);
        /*
        browser.driver.get("http://google.com");
        browser.driver.sleep(2000);
        console.log(browser.getTitle())
        expect(browser.getTitle()).toEqual('Google');
        done();
        */


        browser.get('http://google.com');
        expect(browser.getTitle()).to.eventually.eq('Google');
        done();
    });
    
    
    it('should login, logout, login, and logout with Facebook', function(done) {
        
        this.slow(4000);

        browser.get('/');
        browser.findElement(by.id('facebook-login')).click()

        browser.findElement(by.id('email')).sendKeys("khdrsbt_liangman_1436318828@tfbnw.net");
        browser.findElement(by.id('pass')).sendKeys("martin");
        browser.findElement(by.id('u_0_2')).click();


        browser.findElement(by.id('logout')).click();

        browser.findElement(by.id('facebook-login')).click();

        browser.findElement(by.id('logout')).click();


        // we're about to authorize some permissions, but the button isn't enabled for a second
        //fbLoginButton.driver.sleep(1500);
        //console.log(fbLoginButton.getText());
        
        done();

        //expect(browser.getTitle()).to.eventually.equal('My AngularJS App');
    });
    
});




















