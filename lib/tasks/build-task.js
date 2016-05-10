'use strict';

const q = require('q');
const Task = require('./base/task');
const CleanTask = require('./clean-task');
const CopyTask = require('./copy-task');
const CompileTask = require('./compile-task');

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
    _this.options = Object.assign({
      env: 'dev',
    }, options);

    return _this.clean().
      then(() => _this.copy()).
      then(() => _this.compile(_this.options.env));
  }

  clean() {
    const _this = this;
    const clean = new CleanTask();

    _this.ui.startProgress('Cleaning');
    return clean.run().
      finally(() => {
        _this.ui.stopProgress();
      }).
      then(() => {
        _this.ui.writeSuccess('Clean successful.');
        return q();
      }).
      catch(() => {
        _this.ui.writeError('Failed to clean directories: [ dist, tmp ]');
        return q.reject();
      });
  }

  copy() {
    const _this = this;
    const copy = new CopyTask();

    _this.ui.startProgress('Copying vendor files');
    return copy.run({}).
      finally(() => {
        _this.ui.stopProgress();
      }).
      then(() => {
        _this.ui.writeSuccess('Copied vendor and third party libraries.');
        return q();
      }).
      catch(() => {
        _this.ui.writeError('Error copying files.');
        return q.reject();
      });
  }

  compile(env) {
    const _this = this;
    const compile = new CompileTask();

    _this.ui.startProgress('Building');

    return compile.run(env).
      finally(() => {
        _this.ui.stopProgress();
      }).
      then(() => {
        _this.ui.writeSuccess('Build successful.');
        return q();
      }).
      catch(() => {
        _this.ui.writeError('Build failed.');
        return q.reject();
      });
  }
}

module.exports = BuildTask;
