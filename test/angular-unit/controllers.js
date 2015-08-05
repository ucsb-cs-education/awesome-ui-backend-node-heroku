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

	describe('QuizStartCtrl', function() {
  		var QDMock = {
			"id":1,
			"descriptor":{}
		};
		var RouteParamsMock = { id: 1 };
		var LocationMock = {};
		var $controller, controller;
					
		beforeEach(function() {
			module('awesomeApp', function($provide) {
				$provide.value('qd', QDMock);
				$provide.value('$routeParams', RouteParamsMock);
				$provide.value('$location', LocationMock);
			});
			inject(function(_$controller_) {
				$controller = _$controller_;
			});

			LocationMock.currentPath = "/quizdescriptor/1";
			LocationMock.currentSearch = {};
			LocationMock.path = function(path) { 
				if (path) {
					this.currentPath = path;
					return this;
				} else {
					return this.currentPath;
				}
			}
			LocationMock.search = function(query) { 
				if (query) {
					this.currentSearch = query;
					return this;
				} else {
					return this.currentSearch;
				}
			}
			controller = $controller('QuizStartCtrl', { $scope: {}});
		});

		describe('qd', function() {
			it('should be assigned the qd service result', function() {
				expect(controller.qd).to.equal(QDMock);
			});
		});

		describe('displayOption', function() {
			it('should initialize to the string "questions"', function() {
				expect(controller.displayOption).to.equal("questions");
			});
		});

		describe('seed', function() {
			it('should initialize as an empty string', function() {
				expect(controller.seed).to.equal("");
			});
		});

		describe('startQuiz', function() {

			beforeEach(function() {
				LocationMock.currentPath = "/quizdescriptor/1";
				LocationMock.currentSearch = {};
			});

			it('should navigate to the /quiz/:id page where :id is routeParams.id', function() {
				controller.startQuiz();
				expect(LocationMock.path()).to.include('/quiz/' + RouteParamsMock.id);
			});

			describe('empty seed input', function() {
				it('should navigate to quiz page with the s param set', function() {
					controller.startQuiz();
					expect(LocationMock.search().s).to.exist;
				});
			});

			describe('non-empty seed input', function() {
				it('should navigate to quiz page without the s param set as the given seed', function() {
					controller.seed = 42;
					controller.startQuiz();
					expect(LocationMock.search().s).to.equal(42);
				});
			});

			describe('answers display option', function() {
				it('should navigate to quiz page with the params q = 1 and k = 0', function() {
					controller.displayOption = "questions";
					controller.startQuiz();
					expect(LocationMock.search().q).to.equal(1);
					expect(LocationMock.search().k).to.equal(0);
				});
			});
			
			describe('questions & answers display option', function() {
				it('should navigate to quiz page with the params q = 1 and k = 1', function() {
					controller.displayOption = "questions_answers";
					controller.startQuiz();
					expect(LocationMock.search().q).to.equal(1);
					expect(LocationMock.search().k).to.equal(1);
				});
			});
			
			describe('answers display option', function() {
				it('should navigate to quiz page with the params q = 0 and k = 1', function() {
					controller.displayOption = "answers";
					controller.startQuiz();
					expect(LocationMock.search().q).to.equal(0);
					expect(LocationMock.search().k).to.equal(1);
				});
			});
		});

	});

	describe('QuizCtrl', function() {
		var QuizMock = {
			"title":"First Fixture Example Quiz"
		};
		var RouteParamsMock = {
			id: 1,
			s : 1,
			q : 1,
			k : 1
		};
		var $controller, controller;
		beforeEach(function() {
			module('awesomeApp', function($provide) {
				$provide.value('quiz', QuizMock);
				$provide.value('$routeParams', RouteParamsMock);
			});
			inject(function(_$controller_) {
				$controller = _$controller_;
			});
			controller = $controller('QuizCtrl', { $scope: {}});
		});



		describe('quiz', function() {
			it('should have set quiz to the quiz service result', function() {
				expect(controller.quiz).to.eql(QuizMock);
			});
		});

		describe('seed', function() {
			before(function() {
				RouteParamsMock = { id: 6, s : 2, q : 0, k : 1 };
			});

			it('should set seed according to the routeParams', function() {
				expect(controller.seed).to.equal(RouteParamsMock.s);
			});
			describe('when seed is not in the routeParams', function() {
				before(function() {
					RouteParamsMock = { id: 6, q : 0, k : 1 };
				});
				it('should (for now) use seed 1', function() {
					expect(controller.seed).to.equal(1);
				});
			});
		});

		describe('showQuestions', function() {
			before(function() {
				RouteParamsMock = { id: 6, s : 1, q : 0, k : 1 };
			});
			it('should set showQuestions according to the routeParams', function() {
				expect(controller.showQuestions).to.equal(RouteParamsMock.q | 0);
			});

			describe('when showQuestions is not defined in routeParams', function() {
				before(function() {
					RouteParamsMock = { id: 6, s : 1, k : 1 };
				});
				it('should use the default value of 1', function() {
					expect(controller.showQuestions).to.be.true;
				});
			});

			describe('when showQuestions is not 0 or 1 in routeParams', function() {
				before(function() {
					RouteParamsMock = { id: 6, s : 1, q : 2, k : 1 };
				});
				it('should use the default value of 1', function() {
					expect(controller.showQuestions).to.be.true;
				});
			});

		});

		describe('showKey', function() {
			before(function() {
				RouteParamsMock = { id: 6, s : 1, q : 0, k : 1 };
			});
			it('should set showKey according to the routeParams', function() {
				expect(controller.showKey).to.equal(RouteParamsMock.k | 0);
			});

			describe('when showKey is not defined in routeParams', function() {
				before(function() {
					RouteParamsMock = { id: 6, s : 1, q : 0 };
				});
				it('should use the default value of 0', function() {
					expect(controller.showKey).to.be.false;
				});
			});

			describe('when showKey is not 0 or 1 in routeParams', function() {
				before(function() {
					RouteParamsMock = { id: 6, s : 1, q : 0, k : 2 };
				});
				it('should use the default value of 0', function() {
					expect(controller.showKey).to.be.false;
				});
			});

		});


	});
    
});

















