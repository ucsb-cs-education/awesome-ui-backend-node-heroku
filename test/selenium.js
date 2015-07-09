var wd = require('wd');
var config = require('../config/sauce.json');
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
var querystring = require('querystring');
var request = require('request');
var authConfig;

var os = require('os');
var isLocal = (os.hostname().indexOf("local") > -1);
if(isLocal) {
    authConfig = require('../config/authentication.json')['localhost'];
    baseURL = 'http://localhost:5000';
} else {
    authConfig = require('../config/authentication.json')['development'];
	baseURL = 'https://agile-thicket-8103.herokuapp.com';
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
		this.timeout(60000);
	} else {
		this.timeout(60000);
	}
    var browser;
    var accessToken; // used for facebook api request
    var testUser;
    var allPassed = true;

    before(function(done) {
    	if (isLocal) {
	        browser = wd.promiseChainRemote("localhost", 4444);
    	} else {
	        browser = wd.promiseChainRemote("ondemand.saucelabs.com", 80, config.SAUCE_USERNAME, config.SAUCE_ACCESS_KEY);
    	}

        // get facebook access token
        request.get("https://graph.facebook.com/oauth/access_token?client_id=" + authConfig.facebookAuth.clientID + 
            "&client_secret=" + authConfig.facebookAuth.clientSecret + "&grant_type=client_credentials",
            function (error, response, body) {
                console.log('Got facebook access token.')
                accessToken = querystring.parse(body).access_token;
                request.post(
                    'https://graph.facebook.com/v2.4/' + authConfig.facebookAuth.clientID + '/accounts/test-users',
                    { json: { access_token: accessToken } },
                    function (error, response, body) {
                        testUser = body;
                        console.log("Created test user with email " + testUser.email);

                        console.log('now were done.');
                        browser
                            .init(desired)
                            .nodeify(done);
                    }
                );
            }
        );

    });

    afterEach(function(done) {
        allPassed = allPassed && (this.currentTest.state === 'passed');  
        done();
    });

    after(function(done) {

        // Delete test user we created.
        request.del(
            'https://graph.facebook.com/v2.4/' + testUser.id,
            { json: { access_token: accessToken } },
            function (error, response, body) {
                console.log("Deleted user with email: " + testUser.email);

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
            }
        );

    });


    it("should log in with Facebook then out", function(done) {
        browser
            .get(baseURL)
            .elementById('facebook-login')
            .click()
            .eval("window.location.href")
            .should.eventually.include("facebook.com")
            .elementById("email")
            .type(testUser.email)
            .elementById("pass")
            .type(testUser.password)
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
            .should.eventually.equal(baseURL + '/')
            .elementById('facebook-login')
            .nodeify(done)
            
    });

    it("should log in with Facebook then out", function(done) {
        browser
            .get(baseURL)
            .elementById('facebook-login')
            .click()
            .eval("window.location.href")
            .waitForElementById("logout", wd.asserters.isDisplayed, 3000)
            .click()
            .eval("window.location.href")
            .should.eventually.equal(baseURL + '/')
            .elementById('facebook-login')
            .nodeify(done)
            
    });

});




















