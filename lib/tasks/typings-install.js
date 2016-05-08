'use strict';

const TypingsTask = require('./base/typings-task');

class TypingsInstall extends TypingsTask {
  constructor(args) {
    super(Object.assign({
      command: 'install',
      startProgressMessage: 'Installing definitions via typings',
      completionMessage: 'Installed definitions via typings.',
      failureMessage: 'Failed to install definitions via typings.',
    }, args));
  }
}

module.exports = TypingsInstall;
