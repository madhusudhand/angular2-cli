'use strict';

const Promise = require('promise');
const typings = require('typings-core');
const logger  = require('../ui/logger');
const Task    = require('./task');

class TypingsTask extends Task {
  constructor(args) {
    super(Object.assign({
      errors               : '',
      command              : '',
      startProgressMessage : '',
      completionMessage    : '',
    }, args));
  }

  run() {
    this.options = {
      dir : this.dir,
    };

    this.startTime = new Date();
    this.ui.startProgress(this.startProgressMessage);

    return this.typingsInstall();
  }

  typingsInstall() {
    const _this = this;

    return typings.install({
      cwd : process.cwd(),
    }).
      then((result) => {
        _this.finally();
        return _this.announceCompletion(result);
      }).
      catch((result) => {
        _this.finally();
        return _this.announceFailure(result);
      });
  }

  announceCompletion(result) {
    const err = logger.logErrors(result.stderr);
    if (!err) {
      const timeDiff = (new Date() - this.startTime) / 1000;
      this.ui.writeSuccess(`${this.completionMessage} (${Math.round(timeDiff)} sec)`);
    }
    return Promise.resolve();
  }

  announceFailure(result) {
    this.ui.writeError(this.failureMessage);
    const err = logger.logErrors(result.stderr);
    return Promise.reject(err);
  }

  finally() {
    this.ui.stopProgress();
  }
}

module.exports = TypingsTask;
