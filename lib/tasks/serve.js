'use strict';

var ServeTask = require('./base/run-task');

module.exports = ServeTask.extend({
  script: 'start',
  startMessage: 'Serving the app on http://localhost:3000/',
  errorMessage: 'Error launching App.',
});
