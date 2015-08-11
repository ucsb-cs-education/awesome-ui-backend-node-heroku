'use strict';

var awesomeApp = angular.module('awesomeApp', ['ngCookies', 'ui.router', 'ui.bootstrap', 'flash', 'restangular']);
awesomeApp.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', 'RestangularProvider', function($stateProvider, $urlRouterProvider, $locationProvider, RestangularProvider) {
    
    RestangularProvider.setBaseUrl('/api');

	$locationProvider.html5Mode({
		enabled: true
	});
	$urlRouterProvider.otherwise("/");
	$stateProvider
	.state('/', {
		url: '/',
		templateUrl: 'partials/index.html'
	})
	.state('/student', {
		url: '/student',
		templateUrl: 'partials/student.html',
		controller: 'QuizDescriptorCtrl',
		controllerAs: 'quizDescriptors',
		resolve: {
			qds: ['Restangular', function(Restangular) {
				return Restangular.all('qd').getList();
			}]
		}
	})
	.state('instructor', {
		url: '/instructor',
		templateUrl: 'partials/instructor.html',
		controller: 'QuestionExportCtrl',
		controllerAs: 'exporter'
	})
	.state('instructor.quizdescriptors', {
		url: '/quizdescriptors',
		templateUrl: 'partials/instructor.quizdescriptors.html',
		controller: 'QuizDescriptorCtrl',
		controllerAs: 'quizDescriptors',
		resolve: {
			qds: ['Restangular', function(Restangular) {
				return Restangular.all('qd').getList();
			}]
		}

	})
	.state('instructor.export', {
		url: '/export',
		templateUrl: 'partials/instructor.export.html'

	})
	.state('/developer', {
		url: '/developer',
		templateUrl: 'partials/developer.html'
	})
	.state('/author', {
		url: '/author',
		templateUrl: 'partials/author.html'
	})
	.state('/login', {
		url: '/login',
		templateUrl: 'partials/login.html'
	})
	.state('/usersettings', {
		url: '/usersettings',
		templateUrl: 'partials/usersettings.html',
		controller: 'UserPrefCtrl',
		controllerAs: 'preferences'
	})
	.state('/quiz/:id', {
		url: '/quiz/:id',
		templateUrl: 'partials/quizdescriptor.html',
		controller: 'QuizStartCtrl',
		controllerAs: 'quizStarter',
		resolve: {
			qd: ['Restangular', '$stateParams', function(Restangular, $stateParams) {
				return Restangular.one('qd', $stateParams.id).get();
			}]
		}
	})
	.state('/quiz/:id/:seed', {
		url: '/quiz/:id/:seed',
		templateUrl: 'partials/quiz.html',
		controller: 'QuizCtrl',
		controllerAs: 'quizCtrl',
		resolve: {
			quiz: ['Restangular', 'SeedGenerator', '$stateParams', function(Restangular, SeedGenerator, $stateParams) {
				var error = {};
				if (!SeedGenerator.isValidSeed($stateParams.seed))
					return { error: { invalidSeed: true } };
				return Restangular.one('quiz', $stateParams.id).customGET($stateParams.seed).then(function(quiz) {
					return quiz;
				}, function(error) {
					return { error: { notFound: true } };
				});
			}]
		}
	})
}])
.run(['AuthService', '$rootScope', '$location', function(AuthService, $rootScope, $location) {
	$rootScope.$on( "$stateChangeStart", function(event, next, current) {
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


















