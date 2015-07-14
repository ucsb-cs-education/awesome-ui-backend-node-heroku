var expect = require("chai").expect;

describe('Environment Variables', function() {
  it('should find that all required environment variables are set', function(done){
    expect(process.env.NODE_ENV).to.not.equal('production');
    expect(process.env.DATABASE_URL).to.exist;
    // expect(process.env.SESSION_SECRET).to.exist; // this is optional for now
    expect(process.env.FACEBOOK_APP_ID).to.exist;
    expect(process.env.FACEBOOK_APP_SECRET).to.exist;
    expect(process.env.FACEBOOK_CALLBACK_URL).to.exist;
    expect(process.env.FACEBOOK_TEST_EMAIL).to.exist;
    expect(process.env.FACEBOOK_TEST_PASSWORD).to.exist;
    expect(process.env.GOOGLE_APP_ID).to.exist;
    expect(process.env.GOOGLE_APP_SECRET).to.exist;
    expect(process.env.GOOGLE_CALLBACK_URL).to.exist;
    expect(process.env.GOOGLE_TEST_EMAIL).to.exist;
    expect(process.env.GOOGLE_TEST_PASSWORD).to.exist;
    done();
  });
});
