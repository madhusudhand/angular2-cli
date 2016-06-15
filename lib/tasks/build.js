'use strict';

const q       = require('q');
const Task    = require('./task');
const Clean   = require('./clean');
const Copy    = require('./copy');
const Compile = require('./compile');

class Build extends Task {
  constructor(args) {
    super(Object.assign({
      env : 'dev',
    }, args));
  }

  run(options) {
    const _this = this;
    _this.options = Object.assign({}, options);

    return _this.clean().
      then(() => _this.copy()).
      then(() => _this.compile(_this.env));
  }

  clean() {
    const _this = this;
    const clean = Clean.new();

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
    const copy = Copy.new();

    _this.ui.startProgress('Copying vendor and third party libraries');
    return copy.run({}).
      finally(() => {
        _this.ui.stopProgress();
      }).
      then(() => {
        _this.ui.writeSuccess('Copied vendor and third party libraries.');
        return q();
      }).
      catch(() => {
        _this.ui.writeError('Error copying vendor and/or third party libraries.');
        return q.reject();
      });
  }

  compile(env) {
    const _this = this;
    const compile = Compile.new();

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

module.exports = {
  new : (args) => new Build(args),
};
