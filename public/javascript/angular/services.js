'use strict';

awesomeApp.factory("AuthService",['$cookies', 'Restangular', function($cookies, Restangular) {
    var authService = {};

	authService.isAuthenticated = function() {
		return (typeof $cookies.get('awesome_id') !== 'undefined');
	}
    authService.getAwesomeId = function() {
        return $cookies.get('awesome_id');
    }
    authService.getEmail = function() {
        return $cookies.get('email');
    }
    authService.getName = function() {
        return $cookies.get('name');
    }
    authService.getRole = function() {
        return $cookies.get('role');
    }

    authService.updateUser = function (role) {
        var me = Restangular.one('user',$cookies.get('awesome_id'));
        me.role = role;
        return me.put().then(function(user) {
            $cookies.put('role', user.role);
            return user;
        });
    }

	return authService;
}]);

awesomeApp.factory('SeedGenerator', [function() {
    var generator = {};
    generator.getSeed = function() {
        return (Math.floor(Math.random() * (0xFFFFFFFF + 1))).toString(16);
    }
    return generator;
}]);















