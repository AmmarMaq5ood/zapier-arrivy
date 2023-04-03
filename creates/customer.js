const sample = require('../samples/sample_issue');
const customers_util = require('./customers_utli');

const createCustomer = (z, bundle) => {
  return customers_util.create_customer(z, bundle, false);
};

module.exports = {
  key: 'customer',
  noun: 'Customer',

  display: {
    label: 'Create New Customer in Arrivy',
    description: 'Creates a new Customer record in Arrivy'
  },

  operation: {
    inputFields: [
      {key: 'first_name', label:'Customer First Name (Use this if you only have Customer Name)', required: true},
      {key: 'last_name', label:'Customer Last Name', required: false},
      {key: 'company_name', label:'Company Name', required: false},
      {key: 'address', label:'Customer Address', required: false},
      {key: 'address_line_1', label:'Customer Address Line 1 (Street)', required: false},
      {key: 'address_line_2', label:'Customer Address Line 2', required: false},
      {key: 'city', label:'Customer City', required: false},
      {key: 'state', label:'Customer State', required: false},
      {key: 'country', label:'Customer Country', required: false},
      {key: 'zipcode', label:'Customer Zip Code', required: false},
      {key: 'phone', label:'Customer Phone', required: false},
      {key: 'email', label:'Customer Email', required: false},      
      {key: 'notes', label:'Notes', required: false},
      {key: 'external_id', label:'External Id from your system for reference', required: false, type: 'string'},
      {key: 'group_id', label:'Group Id from your Arrivy account (in case you are using mutliple groups)', required: false, type: 'integer'},
      {
        key: 'notifications', label:'Indicate whether you want to enable SMS and Email notifications', required: false, type: 'string',
        "choices": ["Both SMS and Email", "SMS only", "Email only", "None"], default: 'Both SMS and Email'
      },
      {key: 'extra_fields', label:'Add key and values for any data you would like to add to this customer', required: false, dict: true}
    ],
    perform: createCustomer,
    sample: sample
  }
};
