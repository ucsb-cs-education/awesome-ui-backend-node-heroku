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
		var SeedGeneratorMock = {
			isValidSeed: function(s) { return false; },
			getSeed: function() { return ''; }
		};
		var LocationMock = {};
		var $controller, controller;
					
		beforeEach(function() {
			module('awesomeApp', function($provide) {
				$provide.value('qd', QDMock);
				$provide.value('$routeParams', RouteParamsMock);
				$provide.value('SeedGenerator', SeedGeneratorMock);
				$provide.value('$location', LocationMock);
			});
			inject(function(_$controller_) {
				$controller = _$controller_;
			});

			LocationMock.currentPath = "/quiz/1";
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
				LocationMock.currentPath = "/quiz/1";
				LocationMock.currentSearch = {};
			});

			describe('empty seed input', function() {
				before(function() {
					SeedGeneratorMock = {
						isValidSeed: function(s) { return false; },
						getSeed: function() { return 'aaaabbbb'; }
					};
				});
				it('should navigate to quiz page with the :seed set by SeedGenerator', function() {
					controller.startQuiz();
					expect(LocationMock.path()).to.include('/quiz/' + RouteParamsMock.id + '/aaaabbbb');
				});
			});

			describe('non-empty valid seed input', function() {
				before(function() {
					SeedGeneratorMock = {
						isValidSeed: function(s) { return true; },
						getSeed: function() { return 'aaaabbbb'; }
					};
				});
				it('should navigate to quiz page without the s param set as the given seed', function() {
					controller.seed = 'abcd1234';
					controller.startQuiz();
					expect(LocationMock.path()).to.include('/quiz/' + RouteParamsMock.id + '/abcd1234');
				});
			});

			describe('non-empty invalid seed input', function() {
				before(function() {
					SeedGeneratorMock = {
						isValidSeed: function(s) { return false; },
						getSeed: function() { return 'aaaabbbb'; }
					};
				});
				it('should not navigate to quiz page', function() {
					controller.seed = 'notvalidseed';
					controller.startQuiz();
					expect(LocationMock.path()).to.equal('/quiz/1');
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
			"title":"First Fixture Example Quiz",
			"questions":[{
		        "question": "Convert 11011 from base 2 to octal.",
		        "answer": "33",
		        "format": "input"
		    }]
		};
		var RouteParamsMock = {
			id: 1,
			seed : 'abcddcba',
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

		describe('gradeQuiz()', function() {

			it('should set graded to true', function() {
				controller.gradeQuiz();
				expect(controller.graded).to.be.true;
			});

			it('should mark a question as incorrect if the userAnswer is not defined', function() {
				QuizMock.questions = [
					{
				        "question": "Convert 11011 from base 2 to octal.",
				        "answer": "33"
			    	}
			    ];
			    controller.gradeQuiz();
			    expect(controller.quiz.questions[0].isCorrect).to.be.false;
			});
			
			it('should mark a question as incorrect if the userAnswer does not match the answer property', function() {
				QuizMock.questions = [
					{
				        "question": "Convert 11011 from base 2 to octal.",
				        "answer": "33",
				        "userAnswer": "55"
			    	}
			    ];
			    controller.gradeQuiz();
			    expect(controller.quiz.questions[0].isCorrect).to.be.false;
			});
			
			it('should mark a question as correct if the userAnswer matches the answer property', function() {
				QuizMock.questions = [
					{
				        "question": "Convert 11011 from base 2 to octal.",
				        "answer": "33",
				        "userAnswer": "33"
			    	}
			    ];
			    controller.gradeQuiz();
			    expect(controller.quiz.questions[0].isCorrect).to.be.true;
			});

		});

		describe('graded', function() {
			it('should be initialized to false', function() {
				expect(controller.graded).to.be.false;
			});
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
				expect(controller.seed).to.equal(RouteParamsMock.seed);
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

















