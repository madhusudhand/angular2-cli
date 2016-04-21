'use strict';

var TypingsTask = require('./base/typings-task');

module.exports = TypingsTask.extend({
  command: 'install',
  startProgressMessage: 'Installing definitions via typings',
  completionMessage: 'Installed definitions via typings.',
  failureMessage: 'Failed to install definitions via typings.'
});
