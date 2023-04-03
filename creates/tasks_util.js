
const get_task_object = function(z, bundle, unscheduled) {

    // let extra_fields = '';
    let template_extra_fields = [];
    if (bundle.inputData.extra_fields) {
      for (const key in bundle.inputData.extra_fields) {
        template_extra_fields.push({
          type: "TEXT",
          name: key,
          value: bundle.inputData.extra_fields[key],
          use_dropdown_labels_and_values_as: null,
          dropdown_labels_and_values: null,
          dropdown_labels_and_values_order:{}
        })
      }
      template_extra_fields = JSON.stringify(template_extra_fields);
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
  
    const additional_addresses = [];
    if (bundle.inputData.destination_address || bundle.inputData.destination_address_line_1 || bundle.inputData.destination_address_line_2 ||
      bundle.inputData.destination_city || bundle.inputData.destination_state || bundle.inputData.destination_country || bundle.inputData.destination_zipcode) {
        additional_addresses.push({
          title: 'Destination Address', 
          complete_address: bundle.inputData.destination_address,
          address_line_1: bundle.inputData.destination_address_line_1,
          address_line_2: bundle.inputData.destination_address_line_2,
          city: bundle.inputData.destination_city,
          state: bundle.inputData.destination_state,
          country: bundle.inputData.destination_country,
          zipcode: bundle.inputData.destination_zipcode
        });
    }
  
    const customer_exact_location={}
    if (bundle.inputData.customer_exact_location && bundle.inputData.customer_exact_location.length>0) {
       customer_exact_location.lat = bundle.inputData.customer_exact_location[0].lat || ""
       customer_exact_location.lng = bundle.inputData.customer_exact_location[0].lng || ""
    }
  
    //TODO:
    //Get Extra Fields somehow into the system
    //Validate timestamp formats
    //Support one line customer address in our API and get google to change it to individual components if needed. Discuss with team.
    const task = {
      title: bundle.inputData.title,
      customer_first_name: bundle.inputData.customer_first_name,
      customer_last_name: bundle.inputData.customer_last_name,
      customer_address: bundle.inputData.customer_address,
      customer_address_line_1: bundle.inputData.customer_address_line_1,
      customer_address_line_2: bundle.inputData.customer_address_line_2,
      customer_city: bundle.inputData.customer_city,
      customer_state: bundle.inputData.customer_state,
      customer_country: bundle.inputData.customer_country,
      customer_zipcode: bundle.inputData.customer_zipcode,
      customer_exact_location: JSON.stringify(customer_exact_location),
      customer_email: bundle.inputData.customer_email,
      customer_mobile_number: bundle.inputData.customer_phone, //Validate the format if it's standard then use customer_mobile_number field otherwise use customer_phone field
      details: bundle.inputData.details,
      unscheduled: unscheduled,
      start_datetime: bundle.inputData.start_datetime,  //validate timestamp here
      end_datetime: bundle.inputData.end_datetime,      //validate timestamp here
      template: bundle.inputData.template,      //template id 
      external_id: bundle.inputData.external_id,
      group_id: bundle.inputData.group_id,
      external_url: bundle.inputData.external_url,
      // extra_fields: extra_fields,
      template_extra_fields: template_extra_fields,
      notifications: JSON.stringify(notifications),
      additional_addresses: JSON.stringify(additional_addresses),
      source: 'zapier',
      external_type: bundle.inputData.external_type
    }
  
    return task;
  }
  
  module.exports.create_task = function(z, bundle, unscheduled, upsert=false) {
    
    const task = get_task_object(z, bundle, unscheduled)
  
    let responsePromise = z.request({
        method: 'POST',
        url: `https://www.arrivy.com/api/tasks/new`,
        form: task
      });
  
    return responsePromise
      .then((response) => {
          const resp =  response;
          return resp;
       }).catch((error)=>{
          z.console.log("create_task failed :");
          z.console.log(error);
          return error
        });
  }
  
  module.exports.upsert_task = function(z, bundle, unscheduled) {
    const task = get_task_object(z, bundle, unscheduled)
    const external_id = bundle.inputData.external_id;
    if (!external_id) {  
      throw new z.errors.HaltedError('external_id not present')
    }
  
    responsePromise = z.request({
      method: 'PUT',
      url: `https://www.arrivy.com/api/express/tasks/upsert/${external_id}`,
      form: task
    });
  
    return responsePromise
      .then((response) => {
          const resp =  response;
          return resp;
       }); 
  }
  
  module.exports.update_task_status = function(z, bundle) {
    const external_id = bundle.inputData.external_id;
    if (!external_id) {  
      // give error if external_id isn't present
      throw new z.errors.HaltedError('external_id not present')
    }
  
    let extra_fields = '';
    if (bundle.inputData.extra_fields) {
      extra_fields = JSON.stringify(bundle.inputData.extra_fields);
    }
  
    const task_status = {
      type: bundle.inputData.type,
      time: new Date().toISOString(),
      reporter_name: bundle.inputData.reporter_name,
      reporter_id: -10001,
      extra_fields: extra_fields,
      source: bundle.inputData.source
    }
  
    responsePromise = z.request({
      method: 'POST',
      url: `https://www.arrivy.com/api/express/tasks/${external_id}/status/new`,
      form: task_status
    });
  
    return responsePromise
      .then((response) => {
          const resp =  response;
          return resp;
       }); 
  }
  