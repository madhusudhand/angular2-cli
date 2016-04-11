'use strict';

var ServeTask = require('./base/run-task');

module.exports = ServeTask.extend({
  script: 'test',
  startMessage: 'Running Tests',
  errorMessage: 'Error running tests.',
  showFullLog: true,
});
