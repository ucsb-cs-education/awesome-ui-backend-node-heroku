var wd = require('wd');
var config = require('../config/sauce.json');
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");

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

/*
describe('Google Search', function() {
	var browser = wd.promiseChainRemote("ondemand.saucelabs.com", 80, username, accessKey);
	it('should fail please', function() {
		expect(2).to.equal(3);
	});
});
*/


var desired = JSON.parse(config.DESIRED || '{"browserName": "chrome"}');
desired.name = 'example with ' + desired.browserName;
desired.tags = ['tutorial'];



var desired = JSON.parse(process.env.DESIRED || '{"browserName": "chrome"}');
desired.name = 'example with ' + desired.browserName;
desired.tags = ['tutorial'];

describe('Selenium Logging in and out (' + desired.browserName + ')', function() {
	this.timeout(10000);
    var browser;
    var allPassed = true;

    before(function(done) {
        var username = config.SAUCE_USERNAME;
        var accessKey = config.SAUCE_ACCESS_KEY;
        browser = wd.promiseChainRemote("ondemand.saucelabs.com", 80, username, accessKey);
        browser
            .init(desired)
            .nodeify(done);
    });

    afterEach(function(done) {
        allPassed = allPassed && (this.currentTest.state === 'passed');  
        done();
    });

    after(function(done) {
        browser
            .quit()
            .sauceJobStatus(allPassed)
            .nodeify(done);
    });

    it("should log in then out", function(done) {
        browser
            .get("https://agile-thicket-8103.herokuapp.com")
            .elementById('facebook-login')
            .click()
            .eval("window.location.href")
            .should.eventually.include("facebook.com")
            /*.elementById("email")
            .type("martintest_bdwqmyw_wolfenbargertest@tfbnw.net")
            .elementById("pass")
            .type("projectawesometest")
            .elementById("u_0_2")
            .click()
            .eval("window.location.href")
            .should.eventually.include("herokuapp.com")
            .elementById("logout")
            .click()
            .eval("window.location.href")
            .should.eventually.include("herokuapp.com/logout")
            .eval("window.location.href")
            .should.eventually.not.include("logout")
            .elementById('facebook-login')*/
            .nodeify(done);
    });
});




















