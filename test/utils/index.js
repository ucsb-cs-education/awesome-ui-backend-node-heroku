module.exports.createTestAuthUrl = function(account_type, id, token, email, name) {
    return ('/auth/test/callback?account_type=' + account_type + '&id=' + id + '&token=' + token + '&email=' + email + '&name=' + name + '&password=test').split(' ').join('+');
}
module.exports.createLogoutUrl = function() {
    return '/logout';
}
