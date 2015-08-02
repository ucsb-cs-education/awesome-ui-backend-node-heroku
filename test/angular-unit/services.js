describe('Angular Services', function() {
	
	describe('AuthService', function() {
		beforeEach(module('awesomeApp'));
  		var AuthService, Restangular, cookies;
		var q, rootScope, deferred;
  		var RestangularMock = {};
  		var testUser;

		beforeEach(function() {
			module('awesomeApp', function($provide) {
				$provide.value('Restangular', RestangularMock);
			});

		    inject(function(_AuthService_, _$cookies_, _$q_, _$rootScope_) {
		    	AuthService = _AuthService_;   
		    	cookies = _$cookies_;
		    	q = _$q_;
		    	rootScope = _$rootScope_;
		    });

		    testUser = {
	  			awesome_id: "1234",
	  			email: "test@email.com",
	  			name: "Test Name",
	  			role: "student"
	  		}

    		cookies.put('awesome_id',testUser.awesome_id);
    		cookies.put('email', testUser.email);
    		cookies.put('name', testUser.name);
    		cookies.put('role', testUser.role);
		});
		
		describe('getAwesomeId()', function() {
			it('should return the awesome_id cookie', function() {
				expect(AuthService.getAwesomeId()).to.equal(testUser.awesome_id);
			});
		});

		describe('getEmail()', function() {
			it('should return the email cookie', function() {
				expect(AuthService.getEmail()).to.equal(testUser.email);
			});
		});

		describe('getName()', function() {
			it('should return the name cookie', function() {
				expect(AuthService.getName()).to.equal(testUser.name);
			});
		});

		describe('getRole()', function() {
			it('should return the role cookie', function() {
				expect(AuthService.getRole()).to.equal(testUser.role);
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
			var one = {};
	    	RestangularMock.one = function(path, awesome_id) {
				one.role = '';
				return one;
	    	}
			describe('successful Restangular put request', function() {
				before(function() {
					one.put = function() {
						deferred = q.defer();
						deferred.resolve({ role : one.role });
						return deferred.promise;
					}
				});

				it('should update the role and set the corresponding cookie', function() {
					var resolveValue;
					AuthService.updateUser('developer')
					.then(function(user) {
						resolveValue = user;
					});
					rootScope.$apply();
					expect(resolveValue.role).to.equal('developer');
					expect(AuthService.getRole()).to.equal('developer');
				});
			});
			describe('successful Restangular put request', function() {
				before(function() {
					one.put = function() {
						deferred = q.defer();
						deferred.reject('error');
						return deferred.promise;
					}
				});
				it('should update the role and set the corresponding cookie', function() {
					var resolveValue;
					var roleBeforeUpdate = AuthService.getRole();
					AuthService.updateUser('developer')
					.then(function(user) {
						expect(false); // shouldn't get here
					}, function(error) {
						resolveValue = error;
					});
					rootScope.$apply();
					expect(resolveValue).to.equal('error');
					expect(AuthService.getRole()).to.equal(roleBeforeUpdate);
				});
			});
		
		});
	
	});
    
});















