'use strict';

var NpmTask = require('./base/npm-task');

module.exports = NpmTask.extend({
  command: 'install',
  startProgressMessage: 'Installing packages via npm (it takes 3-4 min) ',
  completionMessage: 'Installed packages via npm.',
  failureMessage: 'Failed to install packages via npm.'
});
