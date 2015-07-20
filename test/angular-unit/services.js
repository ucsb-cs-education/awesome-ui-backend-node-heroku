
describe('Angular Services', function() {
	
	describe('AuthService', function() {

		var httpBackend;
  		var AuthService;
  		var cookies;
		beforeEach(function() {

			module('awesomeApp');
		    inject(function($httpBackend, _AuthService_, _$cookies_) {
		    	AuthService = _AuthService_;      
		    	httpBackend = $httpBackend;
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

			afterEach(function() {
			    httpBackend.verifyNoOutstandingExpectation();
				httpBackend.verifyNoOutstandingRequest();
			});

			it('should send put request to server and return the data and update the cookie', function (){
				var returnData = { data: { data: true } };
				httpBackend.expectPUT('/api/user/1234?role=developer').respond({});
				var returnedPromise = AuthService.updateUser({ value:'developer', text:'Developer' });
				var result;
				returnedPromise.then(function(response) {
					result = response;
				});
				// flush the backend to "execute" the request to do the expectedGET assertion.
				httpBackend.flush();
				console.log(JSON.stringify(returnData));
				console.log(JSON.stringify(result));
				expect(result.status).to.equal(200);
				expect(cookies.get('role')).to.equal('developer');
				
			});
		});


	});
    
});

















