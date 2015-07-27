RestangularMock = {
	one : function(path, awesome_id) {
		return {
			role: '',
			put: function() {
				return {
					then: function(callback) {
						callback({role: 'student'});
					}
				}
			}
		};
	}
};

describe('Angular Services', function() {
	
	describe('AuthService', function() {
		beforeEach(module('awesomeApp'));
  		var AuthService, Restangular, cookies;

		beforeEach(function() {
			module('awesomeApp', function($provide) {
				$provide.value('Restangular', RestangularMock);
			});
		    inject(function(_AuthService_, _$cookies_) {
		    	AuthService = _AuthService_;   
		    	cookies = _$cookies_;
		    });

    		cookies.put('awesome_id','1234');
    		cookies.put('email', 'test@email.com');
    		cookies.put('name', 'Test Name');
    		cookies.put('role', 'student');
		});
		
		describe('getAwesomeId()', function() {
			it('should return the awesome_id cookie', function() {
				expect(AuthService.getAwesomeId()).to.equal('1234');
			});
		});

		describe('getEmail()', function() {
			it('should return the email cookie', function() {
				expect(AuthService.getEmail()).to.equal('test@email.com');
			});
		});

		describe('getName()', function() {
			it('should return the name cookie', function() {
				expect(AuthService.getName()).to.equal('Test Name');
			});
		});

		describe('getRole()', function() {
			it('should return the role cookie', function() {
				expect(AuthService.getRole()).to.equal('student');
			});
		});
		describe('isAuthenticated()', function() {
			it('should return true when awesome_id is defined', function() {
				expect(AuthService.isAuthenticated()).to.equal(true);
			});
			it('should return false when awesome_id is not defined', function() {
    			cookies.remove('awesome_id');
				expect(AuthService.isAuthenticated()).to.equal(false);
			});
		});

		describe('updateUser()', function() {
			it('should use Restangular to make a put request and update the role on success', function () {
				AuthService.updateUser({ value:'developer', text:'Developer' });
				expect(AuthService.getRole()).to.equal('developer');
			});
		});

	
	});
    
});

















