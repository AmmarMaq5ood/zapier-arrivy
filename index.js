const repoTrigger = require('./triggers/repo');
const taskCreate = require('./creates/task');
const unscheduledTaskCreate = require('./creates/unscheduled_task');
const upsertTaskCreate = require('./creates/upsert_task');
const updateTaskStatusCreate = require('./creates/update_task_status');
const customerCreate = require('./creates/customer');
const issueTrigger = require('./triggers/issue');
const authentication = require('./authentication');


const addApiKeyToHeader = (request, z, bundle) => {
  request.headers['X-Auth-Key'] = bundle.authData.auth_key;
  request.headers['X-Auth-Token'] = bundle.authData.auth_token;
  request.headers['Content-Type'] = 'application/x-www-form-urlencoded';
  return request;
};


const handleHTTPError = (response, z) => {
  if (response.status >= 400) {
    throw new Error(`Unexpected status code ${response.status}`);
  }
  return response;
};

const App = {
  // This is just shorthand to reference the installed dependencies you have. Zapier will
  // need to know these before we can upload
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,
  authentication: authentication,

  // beforeRequest & afterResponse are optional hooks into the provided HTTP client
  beforeRequest: [addApiKeyToHeader],

  afterResponse: [
    handleHTTPError
  ],

  // If you want to define optional resources to simplify creation of triggers, searches, creates - do that here!
  resources: {
  },

  // If you want your trigger to show up, you better include it here!
  triggers: {
    [repoTrigger.key]: repoTrigger,
    [issueTrigger.key]: issueTrigger,
  },

  // If you want your searches to show up, you better include it here!
  searches: {
  },

  // If you want your creates to show up, you better include it here!
  creates: {
    [taskCreate.key]: taskCreate,
    [unscheduledTaskCreate.key]: unscheduledTaskCreate,
    [customerCreate.key]: customerCreate,
    [upsertTaskCreate.key]: upsertTaskCreate,
    [updateTaskStatusCreate.key]: updateTaskStatusCreate
  }
};

// Finally, export the app.
module.exports = App;
