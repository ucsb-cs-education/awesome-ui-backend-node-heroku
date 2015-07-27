'use strict';

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

    if (AuthService.isAuthenticated()) {
        vm.quizzes = qds.getList().$object;
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
        AuthService.updateUser(vm.roleSelection.value)
        .then(function(data) {
            window.location.reload();
        });
    }


    return vm;

}]);









