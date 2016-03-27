'use strict';

var BpTask = require('./base/blueprint-task');

module.exports = BpTask.extend({
  flavor: 'grunt', // default
  startProgressMessage: 'Creating project.',
  completionMessage: 'Project created.',
  failureMessage: 'Project creation failed.'
});
