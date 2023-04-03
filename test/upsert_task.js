'use strict';
const should = require('should');

const zapier = require('zapier-platform-core');

const App = require('../index');
const appTester = zapier.createAppTester(App);

const REPO = 'username/reponame' // CHANGE THIS

//These are automated tests for the Issue create and Issue Trigger.
//They will run every time the `zapier test` command is executed.
describe('Create & Update a Task', () => {
  zapier.tools.env.inject();

  it('should create an issue', (done) => {
    const bundle = {
      authData: {
        auth_key: 'd5b2b26e-25de',
        auth_token: 'wqV3HPf1BXaR23S5EjmNGB'
      },
      inputData: {
        external_id: '10200',
        title: 'Scheduled UPSERT Task',
        customer_first_name: 'Arya Stark',
        details: 'Details of the Task',
        start_datetime: '2019-05-17T13:04:00-0700',
        end_datetime: '2019-05-17T16:04:00-0700',
        notifications: 'Both SMS and Email',
        external_url: 'https://www.google.com',
        extra_fields: {
          'Price': '100',
          'Hi': 'There!'
        }
      }
    };
    appTester(App.creates.upsert_task.operation.perform, bundle)
      .then((response) => {
        done();
      })
      .catch(done);
  });
});
