'use strict';

const Task    = require('./task');
const Clean   = require('./clean');
const Compile = require('./compile');

class Build extends Task {
  constructor(args) {
    super(Object.assign({
      env   : 'dev',
      serve : false,
    }, args));
  }

  run(options) {
    this.options = Object.assign({}, options);
    return this.clean()
               .then(() => this.compile(this.env));
  }

  clean() {
    const clean = Clean.new();

    this.ui.startProgress('Cleaning');
    return clean.run()
      .finally(() => {
        this.ui.stopProgress();
      })
      .then(() => {
        this.ui.writeSuccess('Clean successful.');
        return Promise.resolve();
      })
      .catch(() => {
        this.ui.writeError('Failed to clean directories: [ dist, tmp ]');
        return Promise.reject();
      });
  }

  compile(env) {
    const compile = Compile.new({ serve: this.serve });

    this.ui.startProgress('Building');
    return compile.run(env)
      .finally(() => {
        this.ui.stopProgress();
      })
      .then((compiler) => {
        this.ui.writeSuccess('Build successful.');
        return Promise.resolve(compiler);
      })
      .catch((e) => {
        this.ui.writeError('Build failed.');
        return Promise.reject(e);
      });
  }
}

module.exports = {
  new : (args) => new Build(args),
};
