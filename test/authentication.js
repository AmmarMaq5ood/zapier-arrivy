'use strict';
const should = require('should');

const zapier = require('zapier-platform-core');

const App = require('../index');
const appTester = zapier.createAppTester(App);


describe('custom authentication', () => {
  // Put your test TEST_USERNAME and TEST_PASSWORD in a .env file.
  // The inject method will load them and make them available to use in your
  // tests.
  zapier.tools.env.inject();

  it('should authenticate', (done) => {
    const bundle = {
      authData: {
        auth_key: 'd5b2b26e-25de',
        auth_token: 'wqV3HPf1BXaR23S5EjmNGB'
      }
    };

    appTester(App.authentication.test, bundle)
      .then((response) => {
        should.exist(response.created);
        done();
      })
      .catch(done);
  });

});
