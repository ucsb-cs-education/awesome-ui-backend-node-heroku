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

awesomeApp.controller("QuizCtrl", [ 'Restangular', '$routeParams', function(Restangular, $routeParams) {
    var vm = this;
    vm.quiz = {};
    vm.seed = 1;
    vm.showQuestions = true;
    vm.showKey = false;
    if ($routeParams.s != undefined)
        vm.seed = $routeParams.s;
    if ($routeParams.q == 1 || $routeParams.q == 0)
        vm.showQuestions = $routeParams.q | 0;
    if ($routeParams.k == 1 || $routeParams.k == 0)
        vm.showKey = $routeParams.k | 0;
    vm.quiz = Restangular.one('quiz', $routeParams.id).get({ s : vm.seed }).$object;
    return vm;
}]);

awesomeApp.controller("QuizStartCtrl", [ 'Restangular', '$routeParams', '$location', function(Restangular, $routeParams, $location) {
    var vm = this;
    
    vm.qd = Restangular.one('qd', $routeParams.id).get().$object;
    vm.displayOption = "questions";
    vm.seed = "";

    vm.startQuiz = function() {
        var seed, showQuestions, showKey;

        seed = (vm.seed === "") ? "1" : vm.seed;
        showQuestions = (vm.displayOption !== "answers") ? 1 : 0;
        showKey = (vm.displayOption !== "questions") ? 1 : 0;
        $location.path('/quiz/' + $routeParams.id).search({ s: seed, q: showQuestions, k: showKey });
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
        .then(function(user) {
            alert(JSON.stringify(user));
            Flash.create('success', '<strong> Updated:</strong>  Your settings have been saved.');
        }, function(error) {

        });
    }


    return vm;

}]);









