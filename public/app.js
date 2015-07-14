var awesomeApp = angular.module('awesomeApp', []);


// Navigation Bar
awesomeApp.controller('NavBarCtrl', function($scope) {
	$scope.pages = ['student', 'instructor', 'author', 'developer'];
});



awesomeApp.filter('capitalizeFirst', function() {
    return function(input, scope) {
        return input.substring(0,1).toUpperCase()+input.substring(1);
    }
});