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
        return me.put();
    }

	return authService;
}]);


//Temporary service until we start using routes / make app an SPA
awesomeApp.factory("PathIdExtractor",[ function() {
    var pathExtractor = {};

    pathExtractor.idFor = function(path, name) {
        var re = new RegExp("/" + name + "/([^[/|?]+)", "i");
        var match = path.match(re);
        if (match && match.length > 1) return match[1];
        return null;
        
    }

    return pathExtractor;
}]);















