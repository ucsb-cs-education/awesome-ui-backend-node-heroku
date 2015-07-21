module.exports.createTestAuthUrl = function(account_type, id, token, email, name, role) {
    return ('/auth/test/callback?account_type=' + account_type + '&id=' + id + '&token=' + token + '&email=' + email + '&name=' + name + '&password=test' + '&role=' + role).split(' ').join('+');
}
module.exports.createLogoutUrl = function() {
    return '/logout';
}


// /auth/test/callback?account_type=test&id=1&token=test_token&email=test_email&name=testName&password=test&role=author