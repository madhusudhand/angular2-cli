'use strict';

const Task    = require('./task');
const npm     = require('../util/npm');
const logger  = require('../ui/logger');

class Test extends Task {
  constructor(args) {
    super(Object.assign({
      showWarnings : false,
      showFullLog  : true,
      script       : 'test',
      startMessage : 'Running Tests',
      errorMessage : 'Error running tests.',
    }, args));
  }

  run(options) {
    const npmOptions = Object.assign({}, options);

    this.ui.writeInfo(this.startMessage);

    return npm('run', [this.script], npmOptions).
      progress(this.writeProgress.bind(this)).
      then(this.announceCompletion.bind(this)).
      fail(this.annouceFailure.bind(this));
  }

  announceCompletion(result) {
    this.ui.writeSuccess(this.completionMessage);
    logger.logWarnings(result.stderr);
  }

  annouceFailure(result) {
    this.ui.writeError(this.errorMessage);
    logger.logWarnings(result.stderr);
    return Promise.reject();
  }

  writeProgress(result) {
    const _this = this;
    result.stdout.on('data', (data) => {
      if (_this.showFullLog) {
        _this.ui.writeInfo(data);
      } else {
        logger.logErrors(data);
      }
    });

    result.stderr.on('data', (data) => {
      logger.logErrors(data);
    });
  }
}

module.exports = {
  new : (args) => new Test(args),
};
