var chai = require('chai');
var expect = chai.expect;


describe('Environment Variables', function() {
  it('should find that all required environment variables are set', function(done){

    expect(process.env.FACEBOOK_TEST_EMAIL).to.exist;
    expect(process.env.FACEBOOK_TEST_PASSWORD).to.exist;
    expect(process.env.GOOGLE_TEST_EMAIL).to.exist;
    expect(process.env.GOOGLE_TEST_PASSWORD).to.exist;
    done();
  });
});