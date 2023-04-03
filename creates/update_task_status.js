const sample = require('../samples/sample_issue');
const tasks_util = require('./tasks_util');

const updateTaskStatus = (z, bundle) => {
  return tasks_util.update_task_status(z, bundle);
};

module.exports = {
  key: 'update_task_status',
  noun: 'Update Task Status',

  display: {
    label: 'Updata status of an Arrivy Task',
    description: 'Update status of an Arrivy Task. Add "notes" key in extra_fields to add a note along with the status to Arrivy Task Journal.'
  },

  operation: {
    inputFields: [
      {key: 'external_id', label:'External Id of the task from another system. Please make sure that the task with this external_id was already created on Arrivy.', required: true, type: 'string'},
      {key: 'type', label: 'Status Type', required: true, type: 'string',
        "choices": ["EXCEPTION", "CANCELLED", "COMPLETE", "CONFIRMED", "CUSTOMER_EXCEPTION", "CUSTOM"], default: 'CANCELLED'},
      {key: 'reporter_name', label:'Reporter Name', required: false},
      {key: 'source', label:'Source', required: false, default: 'zapier'},
      {key: 'extra_fields', label:'Add key and values for any data you would like to add to this task status', required: false, dict: true}
    ],
    perform: updateTaskStatus,
    sample: sample
  }
};
