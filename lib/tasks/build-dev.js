'use strict';

var BuildTask = require('./base/build-task');

module.exports = BuildTask.extend({
  script: 'build:dev',
  startProgressMessage: 'Building',
  completionMessage: 'Build successful.',
  errorMessage: 'Build Failed.'
});
