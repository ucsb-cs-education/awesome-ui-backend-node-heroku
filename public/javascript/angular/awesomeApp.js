'use strict';



var awesomeApp = angular.module('awesomeApp', ['ngCookies', 'ui.bootstrap']);


awesomeApp.factory("UserService",['$cookies', function($cookies) {
    var userService = {};

	userService.isAuthenticated = function() {
		return (typeof $cookies.get('awesome_id') !== 'undefined');
	}

    userService.getAwesomeId = function() {
        return $cookies.get('awesome_id');
    }

    userService.getEmail = function() {
        return $cookies.get('email');
    }

    userService.getName = function() {
        return $cookies.get('name');
    }

    userService.getRole = function() {
        return $cookies.get('role');
    }

	return userService;
}]);


awesomeApp.controller('DropDownCtrl', function ($scope) {
    $scope.roles = [
        { text: 'Student', value: 'student' },
        { text: 'Instructor', value: 'instructor' },
        { text: 'Author', value: 'author' },
        { text: 'Developer', value: 'developer' }
    ];
    $scope.status = {
        isopen: false
    };

    $scope.toggleDropdown = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.status.isopen = !$scope.status.isopen;
    };
});

awesomeApp.controller("UserPrefCtrl", [ '$scope', '$http', 'UserService', function($scope, $http, UserService) {
    $scope.updatePreferences = function() {
        $http.put('/api/user/' + UserService.getAwesomeId() + '?role=' + $scope.role.value)
        .success(function(data, status, headers, config) {
            window.location.reload();
        }).
        error(function(data, status, headers, config) {
            alert('error');
        });
    }

    $scope.selectItem = function(role) {
        $scope.role = role;
    }
    $scope.role = { text: UserService.getRole().charAt(0).toUpperCase() + UserService.getRole().slice(1), value: UserService.getRole() };
}]);











