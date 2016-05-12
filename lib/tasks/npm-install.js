'use strict';

const NpmTask = require('./npm-task');

class NpmInstall extends NpmTask {
  constructor(args) {
    super(Object.assign({
      command              : 'install',
      startProgressMessage : 'Installing npm packages',
      completionMessage    : 'Installed npm packages.',
      failureMessage       : 'Failed to install few npm packages.',
    }, args));
  }
}

module.exports = NpmInstall;
