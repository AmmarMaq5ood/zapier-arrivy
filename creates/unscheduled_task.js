const sample = require('../samples/sample_issue');
const tasks_util = require('./tasks_util');


const createUnscheduledTask = (z, bundle) => {
  return tasks_util.create_task(z, bundle, true);
};


module.exports = {
  key: 'unscheduled_task',
  noun: 'Unscheduled Task',

  display: {
    label: 'Create an Unscheduled Arrivy Task',
    description: 'Creates an Unscheduled Arrivy Task. These tasks are available under \'Unsheduled\' Tab at www.arrivy.com. You can make this task scheduled later on at Arrivy. Doing so will trigger the notifications to customers and field crew if the notifications are enabled.'
  },

  operation: {
    inputFields: [
      {key: 'title', label:'Title', required: false},
      {key: 'customer_first_name', label:'Customer First Name (In case you only have the full name of the customer, then assign it to this field)', required: false},
      {key: 'customer_last_name', label:'Customer Last Name', required: false},
      {key: 'customer_address', label:'Customer Address', required: false},
      {key: 'customer_address_line_1', label:'Customer Address Line 1 (Street)', required: false},
      {key: 'customer_address_line_2', label:'Customer Address Line 2', required: false},
      {key: 'customer_city', label:'Customer City', required: false},
      {key: 'customer_state', label:'Customer State', required: false},
      {key: 'customer_country', label:'Customer Country', required: false},
      {key: 'customer_zipcode', label:'Customer Zip Code', required: false},
      {key: 'destination_address', label:'Destination Address', required: false},
      {key: 'destination_address_line_1', label:'Destination Address Line 1 (Street)', required: false},
      {key: 'destination_address_line_2', label:'Destination Address Line 2', required: false},
      {key: 'destination_city', label:'Destination City', required: false},
      {key: 'destination_state', label:'Destination State', required: false},
      {key: 'destination_country', label:'Destination Country', required: false},
      {key: 'destination_zipcode', label:'Destination Zip Code', required: false},
      {
        key: 'customer_exact_location', label: 'Customer Exact Location', required: false,
        children: [
          { key: 'lat', type: 'string', label: 'Latitude', required: false },
          { key: 'lng', type: 'string', label: 'Longitude', required: false }
        ]
      },
      {key: 'customer_phone', label:'Customer Phone', required: false},
      {key: 'customer_email', label:'Customer Email', required: false},      
      {key: 'details', label:'Details', required: false},
      {key: 'start_datetime', label:'Start Date Time', required: false, type: 'datetime'},
      {key: 'end_datetime', label:'End Date Time', required: false, type: 'datetime'},
      {key: 'external_id', label:'External Id of the task from another system. Please ensure it\'s a unique value for each task.', required: false, type: 'string'},
      {key: 'external_url', label:'External URL from your system for reference', required: false, type: 'string'},
      {key: 'group_id', label:'Group Id from your Arrivy account (in case you are using mutliple groups)', required: false, type: 'integer'},
      {key: 'template', label:'Template Id from your Arrivy account', required: false, type: 'integer'},
      {
        key: 'notifications', label:'Indicate whether you want to enable SMS and Email notifications', required: false, type: 'string',
        "choices": ["Both SMS and Email", "SMS only", "Email only", "None"], default: 'Both SMS and Email'
      },
      {key: 'extra_fields', label:'Add key and values for any data you would like to add to this task', required: false, dict: true},

    ],
    perform: createUnscheduledTask,
    sample: sample
  }
};