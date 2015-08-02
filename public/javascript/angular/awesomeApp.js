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
		controllerAs: 'quizDescriptors',
		resolve: {
			qds: ['Restangular', '$route', function(Restangular, $route) {
				return Restangular.all('qd').getList();
			}]
		}
	})
	.when('/instructor', {
		templateUrl: 'partials/instructor.html',
		controller: 'QuizDescriptorCtrl',
		controllerAs: 'quizDescriptors',
		resolve: {
			qds: ['Restangular', '$route', function(Restangular, $route) {
				return Restangular.all('qd').getList();
			}]
		}
	})
	.when('/developer', {
		templateUrl: 'partials/developer.html'
	})
	.when('/author', {
		templateUrl: 'partials/author.html'
	})
	.when('/login', {
		templateUrl: 'partials/login.html'
	})
	.when('/usersettings', {
		templateUrl: 'partials/usersettings.html',
		controller: 'UserPrefCtrl',
		controllerAs: 'preferences'
	})
	.when('/quizdescriptor/:id', {
		templateUrl: 'partials/quizdescriptor.html',
		controller: 'QuizStartCtrl',
		controllerAs: 'quizStarter',
		resolve: {
			qd: ['Restangular', '$route', function(Restangular, $route) {
				return Restangular.one('qd', $route.current.params.id).get();
			}]
		}
	})
	.when('/quiz/:id', {
		templateUrl: 'partials/quiz.html',
		controller: 'QuizCtrl',
		controllerAs: 'quizCtrl',
		resolve: {
			quiz: ['Restangular', '$route', function(Restangular, $route) {
				return Restangular.one('quiz', $route.current.params.id).get({ s : $route.current.params.s });
			}]
		}
	})
	$locationProvider.html5Mode({
		enabled: true
	});
}])
.run(['AuthService', '$rootScope', '$location', function(AuthService, $rootScope, $location) {
	$rootScope.$on( "$routeChangeStart", function(event, next, current) {
		if (!AuthService.isAuthenticated()) {

			// redirect user to login page if they try to access user settings page
			if (next.templateUrl === "partials/usersettings.html") {
				$location.path("/login");
			}

		} else {

			// redirect user to preferred page if they try to access login page
			if (next.templateUrl === "partials/login.html") {
				$location.path("/" + AuthService.getRole());
			}
 
		}
	});
}]);


















