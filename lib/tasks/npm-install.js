'use strict';

const NpmTask = require('./base/npm-task');

class NpmInstall extends NpmTask {
  constructor(args) {
    super(Object.assign({
      command: 'install',
      startProgressMessage: 'Installing packages via npm',
      completionMessage: 'Installed packages via npm.',
      failureMessage: 'Failed to install packages via npm.',
    }, args));
  }
}

module.exports = NpmInstall;
