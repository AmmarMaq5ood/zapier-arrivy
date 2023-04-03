'use strict';

const authentication = {
  type: 'custom',
  // "test" could also be a function
  test: {
    url:
      'https://www.arrivy.com/api/users/profile'
  },
  fields: [
    {
      key: 'auth_key',
      type: 'string',
      required: true,
      helpText: 'Found on your API page'
    },
    {
      key: 'auth_token',
      type: 'string',
      required: true,
      helpText: 'Found on your API page'
    }
  ]
};


module.exports = authentication;
