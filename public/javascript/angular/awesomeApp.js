'use strict';



var awesomeApp = angular.module('awesomeApp', ['ngCookies', 'ui.bootstrap', 'flash']);


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

awesomeApp.factory("API",['$http', function($http) {
    var API = {};
    API.user = {};
    API.quiz = {};



    API.quiz.create = function(descriptor) {
        return $http.post('/api/qd?descriptor='+descriptor);
    }
    API.quiz.read = function() {
        return $http.get('/api/qd');
    }


    API.user.update = function(awesome_id, role) {
        return $http.put('/api/user/' + awesome_id + '?role=' + role);
    }

    return API;
}]);

awesomeApp.controller("QuizDescriptorCtrl", [ 'AuthService', 'API', 'Flash', function(AuthService, API, Flash) {
    var vm = this;

    vm.clickedDescriptor = function(selection) {
        window.location.href = '/showpage/' + selection.id;
    }

    vm.addQuizDescriptor = function() {
        API.quiz.create(vm.quizDescriptorText)
        .success(function(data) {
            Flash.create('success', '<strong> Quiz Descriptor Saved:</strong>  id = ' + data.id + '.', 'custom-class');
            vm.quizzes.push(data);
        })
        .error(function(data) {
            Flash.create('warning', '<strong> Not Saved:</strong>  Invalid Syntax.', 'custom-class');
            return false;
        });
        vm.quizDescriptorText = "";
    }

    vm.quizzes = [];
    vm.quizDescriptorText = "";

    if (AuthService.isAuthenticated()) {
        API.quiz.read()
        .success(function(data) {
            vm.quizzes = data;
        })
        .error(function(data) {
            alert('Some Error - fix');
        });
    }

    return vm;
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









