RestangularMock = {
	one : function(path, awesome_id) {
		var meMock = {}
		meMock.role = '';
		meMock.put = function() {
			var promiseMock = {};
			promiseMock.then = function(callback) {
				callback({role: meMock.role});
			}
			return promiseMock;
		}
		return meMock;
	}
};

describe('Angular Services', function() {
	
	describe('AuthService', function() {
		beforeEach(module('awesomeApp'));
  		var AuthService, Restangular, cookies;
  		var user;

		beforeEach(function() {
			module('awesomeApp', function($provide) {
				$provide.value('Restangular', RestangularMock);
			});

		    inject(function(_AuthService_, _$cookies_) {
		    	AuthService = _AuthService_;   
		    	cookies = _$cookies_;

		    });

		    user = {
	  			awesome_id: "1234",
	  			email: "test@email.com",
	  			name: "Test Name",
	  			role: "student"
	  		}

    		cookies.put('awesome_id',user.awesome_id);
    		cookies.put('email', user.email);
    		cookies.put('name', user.name);
    		cookies.put('role', user.role);
		});
		
		describe('getAwesomeId()', function() {
			it('should return the awesome_id cookie', function() {
				expect(AuthService.getAwesomeId()).to.equal(user.awesome_id);
			});
		});

		describe('getEmail()', function() {
			it('should return the email cookie', function() {
				expect(AuthService.getEmail()).to.equal(user.email);
			});
		});

		describe('getName()', function() {
			it('should return the name cookie', function() {
				expect(AuthService.getName()).to.equal(user.name);
			});
		});

		describe('getRole()', function() {
			it('should return the role cookie', function() {
				expect(AuthService.getRole()).to.equal(user.role);
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
				AuthService.updateUser('developer')
				.then(function(user) {
					expect(user.role).to.equal('developer');
				});
				
			});
		});

	
	});
    
});















