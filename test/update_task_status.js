'use strict';
const should = require('should');

const zapier = require('zapier-platform-core');

const App = require('../index');
const appTester = zapier.createAppTester(App);

const REPO = 'username/reponame' // CHANGE THIS

//These are automated tests for the Issue create and Issue Trigger.
//They will run every time the `zapier test` command is executed.
describe('Update a task status', () => {
  zapier.tools.env.inject();

  it('should create an issue', (done) => {
    const bundle = {
      authData: {
        auth_key: 'd5b2b26e-25de',
        auth_token: 'wqV3HPf1BXaR23S5EjmNGB'
      },
      inputData: {
        external_id: '10200',
        type: 'CANCELLED',
        reporter_name: 'Arya Stark',
        reporter_id: -1001,
        source: 'zapier',
        extra_fields: {
          'notes': 'Hi there!'
        }
      }
    };
    appTester(App.creates.update_task_status.operation.perform, bundle)
      .then((response) => {
        done();
      })
      .catch(done);
  });
});
