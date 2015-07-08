var wd = require('wd');
var config = require('../config/sauce.json');
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");



var os = require('os');
var seleniumURL;
var isLocal = (os.hostname().indexOf("local") > -1);
if(isLocal) {
    URL = 'http://localhost:5000';
} else {
	URL = 'https://agile-thicket-8103.herokuapp.com';
}


chai.use(chaiAsPromised);
chai.should();
chaiAsPromised.transferPromiseness = wd.transferPromiseness;

wd.configureHttp( {
    timeout: 10000,
    retryDelay: 15000,
    retries: 1
});

if(!config.SAUCE_USERNAME || !config.SAUCE_ACCESS_KEY) {
	console.warn('\nPlease configure your sauce credentials in config/sauce.json.\n');
	throw new Error("Missing sauce credentials");
}

var desired = JSON.parse(config.DESIRED || '{"browserName": "chrome"}');
desired.name = 'example with ' + desired.browserName;
desired.tags = ['tutorial'];



var desired = JSON.parse(process.env.DESIRED || '{"browserName": "chrome"}');
desired.name = 'example with ' + desired.browserName;
desired.tags = ['tutorial'];

describe('Selenium Logging in and out (' + desired.browserName + ')', function() {
	if (isLocal) {
		this.timeout(100000);
	} else {
		this.timeout(10000);
	}
    var browser;
    var allPassed = true;

    before(function(done) {
    	if (isLocal) {
	        browser = wd.promiseChainRemote("localhost", 4444);
    	} else {
	        browser = wd.promiseChainRemote("ondemand.saucelabs.com", 80, config.SAUCE_USERNAME, config.SAUCE_ACCESS_KEY);
    	}
        browser
            .init(desired)
            .nodeify(done);
    });

    afterEach(function(done) {
        allPassed = allPassed && (this.currentTest.state === 'passed');  
        done();
    });

    after(function(done) {
    	if (isLocal) {
	        browser
	            .quit()
	            .nodeify(done);
    	} else {
	        browser
	            .quit()
	            .sauceJobStatus(allPassed)
	            .nodeify(done);
    	}
    });

    it("should log in then out", function(done) {
        browser
            .get(URL)
            .elementById('facebook-login')
            .click()
            .eval("window.location.href")
            .should.eventually.include("facebook.com")
            .elementById("email")
            .type("khdrsbt_liangman_1436318828@tfbnw.net")
            .elementById("pass")
            .type("projectawesometestpassword")
            .elementById("u_0_2")
            .click()
            .eval("window.location.href", function(err, href) {
                console.log(href);
                console.log(href.indexOf("facebook.com") > -1);
                if(href.indexOf("facebook.com") > -1) {
                    return browser
                    .waitForElementById("platformDialogForm", wd.asserters.isDisplayed, 3000)
                    .elementByName("__CONFIRM__")
                    .click()
                    .eval("window.location.href")
                } else {
                    return browser
                    .eval("window.location.href")
                }
            })
            .waitForElementById("logout", wd.asserters.isDisplayed, 3000)
            .click()
            .eval("window.location.href")
            .should.eventually.equal(URL + '/')
            .elementById('facebook-login')
            .nodeify(done)
            
            
            /*
            .should.eventually.include(URL)
            .elementById("logout")
            .click()
            .eval("window.location.href")
            .should.eventually.equal(URL + '/')
            .elementById('facebook-login')
            .nodeify(done);
            */
            // #platformDialogForm
    });
});




















