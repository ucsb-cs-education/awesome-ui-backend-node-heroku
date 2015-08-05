var chai = require('chai');
var expect = chai.expect;
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var app = require('../../app.js');
var models = require('../../models');
var utils = require('../utils');
var server;


describe('Pages', function() {

    before(function(done) {
        models.sequelize.sync({ force: true }).then(function () {
            server = app.listen(app.get('port'), function() {
            	browser.get('/').then(function() {
                	done();
            	});
            });
        });
    });

    after(function(done) {
        server.close();
        done();
    });

    describe('/quizdescriptor/:id', function() {
        var qd;
        before(function(done) {
            models.sequelize.sync({ force: true }).then(function () {
                utils.insertQuizDescriptor(models, 'Example Quiz Descriptor Title').then(function(res) {
                    qd = res;
                    browser.get('/quizdescriptor/'+qd.id);
                    done();
                });
            });
        });

        it('should display the quiz title on the page', function() {
            expect(element(by.binding('quizStarter.qd.descriptor.title')).getText()).to.eventually.equal(qd.descriptor.title);
        });

        it('should go to /quiz/:id when the user clicks the Start Quiz button', function(done) {
            element(by.buttonText('Start Quiz')).click();
            expect(browser.getCurrentUrl()).to.eventually.include(browser.baseUrl + '/quiz/' + qd.id);
            done();
        });

    });

    describe('/quiz:id?s=1234abcd&q=showquestions&k=showkey', function() {
        var qd;
        var seed = '1234abcd';
        before(function(done) {
            models.sequelize.sync({ force: true }).then(function () {
                utils.insertQuizDescriptor(models, 'Example Quiz Descriptor Title').then(function(res) {
                    qd = res;
                    browser.get('/quiz/'+qd.id+'?s=' + seed + '&q=1&k=1');
                    done();
                });
            });
        });

        it('should display the quiz title on the page', function() {
            expect(element(by.binding('quizCtrl.quiz.title')).getText()).to.eventually.equal(qd.descriptor.title);
        });

        describe('seed', function() {
            it('should display the same seed on the page and in the url', function(done) {
                expect(element(by.id('quiz-seed')).getText()).to.eventually.equal(seed);
                expect(browser.getCurrentUrl()).to.eventually.include('s='+seed);
                done();
            });
        });

        describe('id', function() {
            it('should display the same quiz id on the page and in the url', function(done) {
                expect(element(by.id('quiz-id')).getText()).to.eventually.equal(qd.id+'');
                expect(browser.getCurrentUrl()).to.eventually.include('/'+qd.id);
                done();
            });
        });
        
    });
});


























