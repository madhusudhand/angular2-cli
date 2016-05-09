'use strict';

const Promise = require('promise');
const Task = require('./task');
const CleanTask = require('./clean-task');
const npm = require('../../util/npm');
const logger = require('../../util/logger');
const CopyTask = require('./copy-task');

class BuildTask extends Task {
  constructor(args) {
    super(Object.assign({
      script: '',
      startProgressMessage: '',
      completionMessage: '',
      errorMessage: '',
    }, args));
  }

  run(options) {
    const _this = this;
    _this.npmOptions = Object.assign({}, options);

    const clean = new CleanTask();
    return clean.run().
      then(() => {
        _this.ui.writeSuccess('Clean successful.');
      }).
      catch(() => {
        _this.ui.writeError('Failed to clean directories: [ dist, tmp ]');
      }).
      then(() => _this.build());
  }

  build() {
    let copy;
    const _this = this;
    try {
      copy = new CopyTask();
    } catch (e) {
      _this.ui.writeError(e);
      return Promise.reject(e);
    }

    _this.ui.startProgress(_this.startProgressMessage);

    return copy.run({}).
      then(() => npm('run', [_this.script], _this.npmOptions).
          finally(_this.finally.bind(_this)).
          then(_this.announceCompletion.bind(_this)).
          fail(_this.annouceFailure.bind(_this))
      ).
      catch((err) => {
        _this.finally();
        _this.annouceFailure(err);
      });
  }

  announceCompletion(result) {
    this.ui.writeSuccess(this.completionMessage);
    logger.logErrors(result.stdout);
    logger.logErrors(result.stderr);
  }

  annouceFailure(result) {
    this.ui.writeError(this.errorMessage);
    logger.logErrors(result.stdout);
    logger.logErrors(result.stderr);

    return Promise.reject();
  }

  finally() {
    this.ui.stopProgress();
  }
}

module.exports = BuildTask;
