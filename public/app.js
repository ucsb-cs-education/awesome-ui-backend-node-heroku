var awesomeApp = angular.module('awesomeApp', []);


// Navigation Bar
awesomeApp.controller('NavBarCtrl', function($scope) {
	$scope.dropDownItems = [
		{ name: "Student", href: "/student" },
		{ name: "Instructor", href: "/instructor" },
		{ name: "Author", href: "/author" },
		{ name: "Developer", href: "/developer" }
	];
});