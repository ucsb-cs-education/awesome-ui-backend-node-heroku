'use strict';

awesomeApp.controller("AuthController", ['$window', 'AuthService', function($window, AuthService) {
    var vm = this;
    vm.isAuthenticated = AuthService.isAuthenticated();
    vm.user = {};

    if (AuthService.isAuthenticated())
        vm.user.name = AuthService.getName();

    vm.facebook = function() {
        $window.location.href = "/auth/facebook";
    }

    vm.google = function() {
        $window.location.href = "/auth/google";
    }

    vm.logout = function() {
        $window.location.href = "/logout";
    }

    return vm;
    
}]);

awesomeApp.controller("QuizStartCtrl", [ 'Restangular', '$routeParams', function(Restangular, $routeParams) {
    var vm = this;
    
    vm.qd = Restangular.one('qd', $routeParams.id).get().$object;
    vm.displayOption = "answer";
    vm.seed = "";

    vm.startQuiz = function() {
        alert("Starting quiz: displayOption = " + vm.displayOption + ", seed = " + vm.seed);
    }
    
    return vm;
}]);

awesomeApp.controller("QuizDescriptorCtrl", [ 'AuthService', 'Flash', 'Restangular', function(AuthService, Flash, Restangular) {
    var vm = this;
    var qds = Restangular.all('qd');

    vm.clickedDescriptor = function(selection) {
        window.location.href = '/showpage/' + selection.id;
    }
    vm.addQuizDescriptor = function() {
        qds.post({descriptor: vm.quizDescriptorText})
        .then(function(qd) {
            Flash.create('success', '<strong> Quiz Descriptor Saved:</strong>  id = ' + qd.id + '.', 'custom-class');
            vm.quizzes.push(qd);
        }, function(error) {
            Flash.create('warning', '<strong> Not Saved:</strong>  Invalid Syntax.', 'custom-class');
        });
        vm.quizDescriptorText = "";
    }
    vm.quizzes = [];
    vm.quizDescriptorText = "";

    vm.quizzes = qds.getList().$object;
    
    return vm;
}]);

awesomeApp.controller("UserPrefCtrl", [ '$scope', 'AuthService', 'Flash', function($scope, AuthService, Flash) {
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
        AuthService.updateUser(vm.roleSelection.value)
        .then(function(data) {
            Flash.create('success', '<strong> Updated:</strong>  Your settings have been saved.');
        }, function(error) {

        });
    }


    return vm;

}]);









