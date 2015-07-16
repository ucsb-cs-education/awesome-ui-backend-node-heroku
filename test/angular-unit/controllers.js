

describe('Angular Controllers', function() {
	
	describe('UserPrefCtrl', function() {
		
  		var $controller;
		beforeEach(function() {

			module('awesomeApp', function ($provide) {
	            UserServiceMock = {
					getRole : function() {
						return 'student';
					}
				};
				$provide.value('UserService', UserServiceMock);
		    });
			inject(function(_$controller_) {
				$controller = _$controller_;
			});
		});

		describe('$scope.role', function() {

			it('should be defined on start', function() {
				var $scope = {  };
				var controller = $controller('UserPrefCtrl', { $scope: $scope });
				expect($scope.role).to.eql({ text: 'Student', value: 'student' });
			});

	  	});
	});
    
});

















