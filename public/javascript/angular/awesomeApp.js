'use strict';



var awesomeApp = angular.module('awesomeApp', ['ngCookies', 'ui.bootstrap']);


awesomeApp.factory("AuthService",['$cookies', '$http', function($cookies, $http) {
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
        return $http.put('/api/user/' + authService.getAwesomeId() + '?role=' + role.value)
        .success(function(data, status, headers, config) {
            $cookies.put('role', role.value);
            return data;
        }).
        error(function(data, status, headers, config) {
            return false;
        });
    }

	return authService;
}]);

awesomeApp.controller("UserPrefCtrl", [ '$scope', 'AuthService', function($scope, AuthService) {

    function roleValueToJSON(roleValue) {
        return { text: roleValue.charAt(0).toUpperCase() + roleValue.slice(1), value: roleValue };
    }
    
    var vm = this;

    vm.roles = [
        { text: 'Student', value: 'student' },
        { text: 'Instructor', value: 'instructor' },
        { text: 'Author', value: 'author' },
        { text: 'Developer', value: 'developer'}
    ];
    vm.roleSelection = roleValueToJSON(AuthService.getRole());

    vm.selectRole = function(role) {
        vm.roleSelection = role;
    }

    vm.updatePreferences = function() {
        AuthService.updateUser(vm.roleSelection)
        .then(function(data) {
            window.location.reload();
        });
    }


    return vm;

}]);











