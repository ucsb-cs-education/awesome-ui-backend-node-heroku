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

awesomeApp.controller("QuizCtrl", [ 'quiz', '$routeParams', function(quiz, $routeParams) {
    var vm = this;
    vm.quiz = quiz;
    vm.seed = 1;
    vm.showQuestions = true;
    vm.showKey = false;
    if ($routeParams.s != undefined)
        vm.seed = $routeParams.s;
    if ($routeParams.q == 1 || $routeParams.q == 0)
        vm.showQuestions = $routeParams.q | 0;
    if ($routeParams.k == 1 || $routeParams.k == 0)
        vm.showKey = $routeParams.k | 0;

    vm.graded = false;

    vm.gradeQuiz = function() {
        for (var i = 0; vm.quiz.questions.length > i; i++) {
            var userAnswer = vm.quiz.questions[i].userAnswer;
            var answer = vm.quiz.questions[i].answer;
            vm.quiz.questions[i].isCorrect = (userAnswer == answer);
        }
        vm.graded = true;
    }


    return vm;
}]);

awesomeApp.controller("QuizStartCtrl", [ 'qd', 'SeedGenerator', 'Flash', '$routeParams', '$location', function(qd, SeedGenerator, Flash, $routeParams, $location) {
    var vm = this;
    
    vm.qd = qd;
    vm.displayOption = "questions";
    vm.seed = "";

    vm.startQuiz = function() {
        if (vm.seed !== "" && !SeedGenerator.isValidSeed(vm.seed))
            return;
        var query = {};
        query.s = vm.seed;
        if (query.s === "")
            query.s = SeedGenerator.getSeed();
        query.q = (vm.displayOption !== "answers") ? 1 : 0;
        query.k = (vm.displayOption !== "questions") ? 1 : 0;
        $location.path('/quiz/' + $routeParams.id).search(query);
    }
    
    return vm;
}]);

awesomeApp.controller("QuizDescriptorCtrl", [ 'qds', 'AuthService', 'Flash', 'Restangular', function(qds, AuthService, Flash, Restangular) {
    var vm = this;
    vm.quizzes = qds;
    vm.quizDescriptorText = "";

    vm.clickedDescriptor = function(selection) {
        window.location.href = '/showpage/' + selection.id;
    }
    vm.addQuizDescriptor = function() {
        Restangular.all('qd').post({descriptor: vm.quizDescriptorText})
        .then(function(qd) {
            Flash.create('success', '<strong> Quiz Descriptor Saved:</strong>  id = ' + qd.id + '.', 'custom-class');
            vm.quizzes.push(qd);
        }, function(error) {
            Flash.create('warning', '<strong> Not Saved:</strong>  Invalid Syntax.', 'custom-class');
        });
        vm.quizDescriptorText = "";
    }

    
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









