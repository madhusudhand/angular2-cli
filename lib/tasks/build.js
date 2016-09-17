'use strict';

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
      // then(() => _this.copy()).
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
        return Promise.resolve();
      }).
      catch(() => {
        _this.ui.writeError('Failed to clean directories: [ dist, tmp ]');
        return Promise.reject();
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
        return Promise.resolve();
      }).
      catch(() => {
        _this.ui.writeError('Error copying vendor and/or third party libraries.');
        return Promise.reject();
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
        return Promise.resolve();
      }).
      catch((e) => {
        _this.ui.writeError('Build failed.');
        return Promise.reject(e);
      });
  }
}

module.exports = {
  new : (args) => new Build(args),
};
