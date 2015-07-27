var passportStub = require('passport-stub');
var app = require('../../app.js');
var models = require('../../models');

module.exports.createTestAuthUrl = function(account_type, id, token, email, name, role) {
    return ('/auth/test/callback?account_type=' + account_type + '&id=' + id + '&token=' + token + '&email=' + email + '&name=' + name + '&password=test' + '&role=' + role).split(' ').join('+');
}
module.exports.createLogoutUrl = function() {
    return '/logout';
}

module.exports.authenticateTestUser = function() {
	var testUser = {
		account_type: "test",
		id: "12345678",
		token: "test_token",
		email: "test@email.com",
		name: "Test Name",
		role: "author"
	};

	return models.User.count().then(function(result) {
		testUser.id += result;
		return models.User.create(testUser).then(function(user) {
			if (!user) throw error("User wasn't created");
			passportStub.install(app);
			testUser.awesome_id = user.awesome_id;
			testUser.username = "testusername";
			passportStub.login(testUser);
			return user;
		});
	});
}

module.exports.unauthenticateTestUser = function() {
	passportStub.uninstall(app);
}

module.exports.waitForElement = function (element) {
    browser.wait(function () {
        return element.isPresent();
    },5000);
    browser.wait(function () {
        return element.isDisplayed();
    },5000);
    return element;
};







