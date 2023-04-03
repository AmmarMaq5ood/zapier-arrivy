'use strict';
const should = require('should');

const zapier = require('zapier-platform-core');

const App = require('../index');
const appTester = zapier.createAppTester(App);

const REPO = 'username/reponame' // CHANGE THIS

//These are automated tests for the Issue create and Issue Trigger.
//They will run every time the `zapier test` command is executed.
describe('Create Unscheduled Task', () => {
  zapier.tools.env.inject();

  it('should create an issue', (done) => {
    const bundle = {
      authData: {
        auth_key: 'd5b2b26e-25de',
        auth_token: 'wqV3HPf1BXaR23S5EjmNGB'
      },
      inputData: {
        title: 'New Task from Zapier 222',
        customer_first_name: 'Arya Stark',
        details: 'Details of the Task',
        destination_address_line_1: '16357 118th ln ne Bothell WA 98011'
      }
    };
    appTester(App.creates.unscheduled_task.operation.perform, bundle)
      .then((response) => {
        done();
      })
      .catch(done);
  });
});
