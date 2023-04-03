const sample = require('../samples/sample_issue');
const tasks_util = require('./tasks_util');

const createTask = (z, bundle) => {
  return tasks_util.create_task(z, bundle, false);
};


module.exports = {
  key: 'task',
  noun: 'Task',

  display: {
    label: 'Create Arrivy Task',
    description: 'Creates an Arrivy Task. If the task date/time isn\'t yet available please look at creating the unscheduled task and you can update it later on www.arrivy.com. If you use this action the customer and crew notifications are sent when the task creation completes if these notifications are enabled.'
  },

  operation: {
    inputFields: [
      {key: 'title', label:'Title', required: false},
      {key: 'customer_first_name', label:'Customer First Name (In case you only have full name of the customer, then assign it to this field)', required: false},
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
      {key: 'start_datetime', label:'Start Date Time', required: true, type: 'datetime'},
      {key: 'end_datetime', label:'End Date Time', required: true, type: 'datetime'},
      {key: 'external_id', label:'External Id of the task from another system. Please ensure it\'s a unique value for each task.', required: false, type: 'string'},
      {key: 'external_url', label:'External URL from your system for reference', required: false, type: 'string'},
      {key: 'group_id', label:'Group Id from your Arrivy account (in case you are using mutliple groups)', required: false, type: 'integer'},

      {key: 'template', label:'Template Id from your Arrivy account', required: false, type: 'integer'},      
      {
        key: 'notifications', label:'Indicate whether you want to enable SMS and Email notifications', required: false, type: 'string',
        "choices": ["Both SMS and Email", "SMS only", "Email only", "None"], default: 'Both SMS and Email'
      },
      {key: 'extra_fields', label:'Add key and values for any data you would like to add to this task', required: false, dict: true},
      {
        key: 'external_type', label:'Please select the Integration type ', required: false, type: 'string',
        "choices": ["HUBSPOT", "PIPEDRIVE", "CALENDLY", "MOVERBASE", "SAMSARA", "SALESFORCE", "OTHER" ], default: 'Please Select'
      },
      // templateExtraFields,
    ],
    perform: createTask,
    sample: sample
  }
};
