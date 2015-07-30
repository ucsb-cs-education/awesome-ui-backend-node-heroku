'use strict';

var awesomeApp = angular.module('awesomeApp', ['ngCookies', 'ngRoute', 'ui.bootstrap', 'flash', 'restangular']);
awesomeApp.config(['$routeProvider', '$locationProvider', 'RestangularProvider', function($routeProvider, $locationProvider, RestangularProvider) {
    RestangularProvider.setBaseUrl('/api');
	$routeProvider
	.when('/', {
		templateUrl: 'partials/index.html'
	})
	.when('/student', {
		templateUrl: 'partials/student.html',
		controller: 'QuizDescriptorCtrl',
		controllerAs: 'quizDescriptors'
	})
	.when('/instructor', {
		templateUrl: 'partials/instructor.html',
		controller: 'QuizDescriptorCtrl',
		controllerAs: 'quizDescriptors'
	})
	.when('/developer', {
		templateUrl: 'partials/developer.html'
	})
	.when('/author', {
		templateUrl: 'partials/author.html'
	})
	.when('/quizdescriptor/:id', {
		templateUrl: 'partials/quizdescriptor.html',
		controller: 'QuizStartCtrl',
		controllerAs: 'quizStarter'
	})
	.when('/login', {
		templateUrl: 'partials/login.html'
	})
	.when('/usersettings', {
		templateUrl: 'partials/usersettings.html',
		controller: 'UserPrefCtrl',
		controllerAs: 'preferences'
	})
	$locationProvider.html5Mode({
		enabled: true
	});
}]);