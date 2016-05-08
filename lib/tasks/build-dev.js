'use strict';

const BuildTask = require('./base/build-task');

class BuildDev extends BuildTask {
  constructor(args) {
    super(Object.assign({
      script: 'build:dev',
      startProgressMessage: 'Building',
      completionMessage: 'Build successful.',
      errorMessage: 'Build Failed.',
    }, args));
  }
}

module.exports = BuildDev;
