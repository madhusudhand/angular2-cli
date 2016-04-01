'use strict';

var NpmTask = require('./base/npm-build-task');

module.exports = NpmTask.extend({
  script: 'build',
  startProgressMessage: 'Building',
  completionMessage: 'Build successful.',
  errorMessage: 'Build Failed.'
});
