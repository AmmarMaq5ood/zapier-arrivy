'use strict';
const should = require('should');

const zapier = require('zapier-platform-core');

const App = require('../index');
const appTester = zapier.createAppTester(App);

const REPO = 'username/reponame' // CHANGE THIS

//These are automated tests for the Issue create and Issue Trigger.
//They will run every time the `zapier test` command is executed.
describe('Create Customer', () => {
  zapier.tools.env.inject();

  it('should create a new customer', (done) => {
    const bundle = {
      authData: {
        auth_key: 'd5b2b26e-25de',
        auth_token: 'wqV3HPf1BXaR23S5EjmNGB'
      },
      inputData: {
        first_name: 'Tim Cook',
        notes: 'Customer hatest when someone calls hm',
        address_line_1: '16357 118th ln ne Bothell WA 98011'
      }
    };
    appTester(App.creates.customer.operation.perform, bundle)
      .then((response) => {
        done();
      })
      .catch(done);
  });
});
