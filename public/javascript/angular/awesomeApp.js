'use strict';

var awesomeApp = angular.module('awesomeApp', ['ngCookies', 'ui.router', 'ui.bootstrap', 'flash', 'restangular']);
awesomeApp.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', 'RestangularProvider', function($stateProvider, $urlRouterProvider, $locationProvider, RestangularProvider) {
    
    RestangularProvider.setBaseUrl('/api');

	$locationProvider.html5Mode({
		enabled: true
	});
	$stateProvider
	.state('home', {
		url: '/',
		templateUrl: 'partials/index.html'
	})
	.state('student', {
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
		controller: 'InstructorCtrl',
		controllerAs: 'instructorCtrl'
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
		templateUrl: 'partials/instructor.export.html',
		controller: 'QuestionExportCtrl',
		controllerAs: 'exporter'

	})
	.state('developer', {
		url: '/developer',
		templateUrl: 'partials/developer.html'
	})
	.state('author', {
		url: '/author',
		templateUrl: 'partials/author.html'
	})
	.state('login', {
		url: '/login',
		templateUrl: 'partials/login.html'
	})
	.state('usersettings', {
		url: '/usersettings',
		templateUrl: 'partials/usersettings.html',
		controller: 'UserPrefCtrl',
		controllerAs: 'preferences'
	})
	.state('quizoptions', {
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
	.state('quiztake', {
		url: '/quiz/:id/{seed:[0-9a-fA-F]{8}}?q&k',
		templateUrl: 'partials/quiz.html',
		controller: 'QuizCtrl',
		controllerAs: 'quizCtrl',
		resolve: {
			quiz: ['Restangular', 'SeedGenerator', '$stateParams', function(Restangular, SeedGenerator, $stateParams) {
				return Restangular.one('quiz', $stateParams.id).customGET($stateParams.seed);
			}]
		}
	})
	.state('404', {
		templateUrl: 'partials/404.html',
	});


	$urlRouterProvider.otherwise(function($injector, $location){
		var state = $injector.get('$state');
		state.go('404');
		return $location.path();
	});
}])
.run(['AuthService', '$rootScope', '$state', '$location', function(AuthService, $rootScope, $state, $location) {

	$rootScope.$on('$stateChangeError', function(event) {
		event.preventDefault();
		$state.go('404');
		return $location.path();
	});

	$rootScope.$on( "$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
		var requiresAuth = ['instructor.quizdescriptors', 'usersettings'];
		var requiresUnauth = ['login'];
		var authenticated = AuthService.isAuthenticated();
		//console.log(toState);
		if (!authenticated) {
			// redirect user to login page if they try to access user settings page
			if (requiresAuth.indexOf(toState.name) != -1) {
				event.preventDefault();
				$state.go("login");
			}

		} else {

			// redirect user to preferred page if they try to access login page
			if (requiresUnauth.indexOf(toState.name) != -1) {
				event.preventDefault();
				$state.go(AuthService.getRole());
			}
 
		}

	});
}]);


















