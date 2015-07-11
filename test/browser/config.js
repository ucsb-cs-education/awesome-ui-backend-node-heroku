exports.config ={
	specs:['index.js'],
	baseUrl: 'http://' + (process.env.CI ? 'ngadmin' : 'localhost') + ':5000',
	framework:'mocha',
	mochaOpts: {
		reporter:'spec',
		slow: 3000,
		enableTimeouts: false
	},
	capabilities: {
		'browserName':'chrome'
	}
};

if (process.env.TRAVIS_BUILD_NUMBER) {
    exports.config.seleniumAddress = 'http://localhost:4445/wd/hub';
    exports.config.capabilities = {
        'name': 'Travis + Protractor Tests',
        'browserName': 'chrome',
        'username': 'wolfenbarger',
        'accessKey': '31a62fcb-50f1-41b6-b89c-a53e7d6be6e8',
        'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
        'build': process.env.TRAVIS_BUILD_NUMBER,
        'tags': [process.env.TRAVIS_BRANCH, process.env.TRAVIS_BUILD_NUMBER, process.env.SAUCE_USERNAME, 'e2e']
    };
}