describe('Angular Controllers', function() {
	
	describe('UserPrefCtrl', function() {
		
  		var $controller, controller;
		beforeEach(function() {

			module('awesomeApp', function ($provide) {
	            AuthServiceMock = {
					getRole : function() {
						return 'student';
					}
				};
				$provide.value('AuthService', AuthServiceMock);
		    });
			inject(function(_$controller_) {
				$controller = _$controller_;
			});
			var $scope = {  };
			controller = $controller('UserPrefCtrl', { $scope: $scope });
		});

		describe('roleSelection', function() {
			it('should be defined on start', function() {
				expect(controller.roleSelection).to.eql({ text: 'Student', value: 'student' });
			});
	  	});

		describe('selectRole(role)', function() {
			it('should set the roleSelection accordingly', function() {
				controller.selectRole({ text: 'Instructor', value: 'instructor' })
				expect(controller.roleSelection).to.eql({ text: 'Instructor', value: 'instructor' });
			});
	  	});
	  	
	});
    
});

















