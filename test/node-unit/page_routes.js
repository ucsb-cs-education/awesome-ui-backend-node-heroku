var app = require('../../index.js');
var request = require('supertest');
var agent = request.agent(app);
var expect = require("chai").expect;
var utils = require("../utils");



// test construction helpers

function makeBasicRouteTest(page) {
  it('GET ' + page + ' should respond with OK 200', function(done){
    agent
    .get(page)
    .expect('Content-Type', /html/)
    .expect(200)
    .end(function(err, res){
      if (err) return done(err);
      done();
    });
  });
}

describe('Routing', function(){

  makeBasicRouteTest('/');
  makeBasicRouteTest('/student');
  makeBasicRouteTest('/instructor');
  makeBasicRouteTest('/author');
  makeBasicRouteTest('/developer');
  makeBasicRouteTest('/usersettings');

  it('GET /pagethatdoesntexist should respond with 404', function(done){
    request(app)
      .get('/pagethatdoesntexist')
      .expect('Content-Type', /html/)
      .expect(404)
      .end(function(err, res){
        if (err) return done(err);
        done()
      });
  });
});

/*

// Not unit tests...

describe('Cookies', function() {
  it('should set the correct cookies when the user is authenticated', function(done) {
    request(app)
      .get(utils.createTestAuthUrl("test", 11, "test_token", "test_email", "TestName"))
      .end(function(err, res){
        request(app)
        .get('/')
        .expect('Content-Type', /html/)
        .expect(200)
        .end(function(err, res){
          if (err) return done(err);
          var cookieString = JSON.stringify(res.header['set-cookie']);
          expect(cookieString).to.include('awesome_id=');
          expect(cookieString).to.include('email=test_email');
          expect(cookieString).to.include('name=TestName');
          expect(cookieString).to.include('role=test');
          expect(cookieString).to.include('connect.sid=');
          done()
        });
      });
  });

});
*/

// Mocha cheatsheet
/*
describe('test suite', function () {
  beforeEach(function() { 
  	// ...
  });
  afterEach(function() { 
  	// ...
  });

  before(function() { 
  	// ...
  });
  after(function() { 
  	// ...
  });

  it('a basic test', function() { 
  	// ...
  });

  it('a test with a promise', function() {
    return somePromiseObject; });

  it('an asynchronous test', function(next) {
    if (success) { next(); } else { next(error); }
  });

  xit('use "xit" for pending tests', function() { 
  	// ...
  });
});
*/

// Chai cheatsheet
/*
expect(3).to.eql(2);

expect(obj).to.be.a('string');
expect(obj).to.be.null;
expect(obj).to.be.true;
expect(obj).to.be.false;
expect(obj).to.be.undefined;

expect(list).to.include("item");
expect(list).to.have.length(3);
expect(list).to.have.length.gt(0);
*/


