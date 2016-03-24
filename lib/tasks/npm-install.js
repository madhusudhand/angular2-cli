'use strict';

var NpmTask = require('./npm-task');

module.exports = NpmTask.extend({
  command: 'install',
  startProgressMessage: 'Installing packages via npm',
  completionMessage: 'Installed packages via npm.'
});
