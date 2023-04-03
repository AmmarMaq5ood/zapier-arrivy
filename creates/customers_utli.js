module.exports.create_customer = function(z, bundle) {

    let extra_fields = '';
    if (bundle.inputData.extra_fields) {
      extra_fields = JSON.stringify(bundle.inputData.extra_fields);
    }
  
    const notifications = {
      sms: true,
      email: true
    };
  
    if (bundle.inputData.notifications == 'SMS only') {
      notifications.email = false;
    } else if (bundle.inputData.notifications == 'Email only') {
      notifications.sms = false;
    } else if (bundle.inputData.notifications == 'None') {
      notifications.sms = false;
      notifications.email = false;
    }
  
  
    //TODO:
    //Get Extra Fields somehow into the system
    //Validate timestamp formats
    //Support one line customer address in our API and get google to change it to individual components if needed. Discuss with team.
    const customer = {
      title: bundle.inputData.title,
      first_name: bundle.inputData.first_name,
      last_name: bundle.inputData.last_name,
      company_name: bundle.inputData.company_name,
      address: bundle.inputData.address,
      address_line_1: bundle.inputData.address_line_1,
      address_line_2: bundle.inputData.address_line_2,
      city: bundle.inputData.city,
      state: bundle.inputData.state,
      country: bundle.inputData.country,
      zipcode: bundle.inputData.zipcode,
      email: bundle.inputData.email,
      mobile_number: bundle.inputData.phone, //Validate the format if it's standard then use mobile_number field otherwise use phone field
      notes: bundle.inputData.notes,
      extra_fields: extra_fields,
      notifications: JSON.stringify(notifications),
      source: 'zapier',
      group_id: bundle.inputData.group_id
    }
  
    const responsePromise = z.request({
      method: 'POST',
      url: `https://www.arrivy.com/api/customers/new`,
      form: customer
    });
  
    return responsePromise
      .then((response) => {
          const resp =  response;
          return resp;
       }); 
  }