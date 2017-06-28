var User = {
  // Enforce model schema in the case of schemaless databases
  schema: true,

  attributes: {
    userId    : { type: 'integer',  unique: true, required: true },
    email     : { type: 'string', unique: true, required: true },
    firstName : { type: 'string', required: true },
    lastName  : { type: 'string', required: true },
    image     : { type: 'string' },
    passports : { collection: 'Passport', via: 'user' },
    role    : { type: 'string', defaultsTo: 'Employee'}, // Employee or Student or admin
    isTerminated : { type: 'boolean', defaultsTo: 0 },
  }
};

module.exports = User;
