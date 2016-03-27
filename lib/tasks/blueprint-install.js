'use strict';

var BpTask = require('./base/blueprint-task');

module.exports = BpTask.extend({
  flavor: 'grunt', // default
  startProgressMessage: 'Creating app',
  completionMessage: 'App created.',
  failureMessage: 'App creation failed.'
});
