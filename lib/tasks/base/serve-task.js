'use strict';

const Promise = require('promise');
const browserSync = require('browser-sync').create();
const historyApiFallback = require('connect-history-api-fallback');

const Task = require('./task');
const errorFilter = require('../../util/error-filter');
const globals = require('../../cli/globals');
// const npm = require('../../util/npm');
const Watcher = require('../../tasks/watcher');

class ServeTask extends Task {
  constructor(args) {
    super(Object.assign({
      script: '',
      startMessage: '',
      errorMessage: '',
      showWarnings: false,
      showFullLog: false,
    }, args));
  }

  run(options) {
    this.npmOptions = Object.assign({}, options);
    this.ui.writeInfo(this.startMessage);

    this.startServer();
    const watch = new Watcher({ dir: globals.sourceDir });
    watch.run();

    return Promise.resolve();
  }

  startServer() {
    browserSync.init({
      server: `./${globals.buildDir}`,
      notify: false,
      middleware: [historyApiFallback()],
      // ghostMode: {
      //   clicks: true,
      //   location: true,
      //   forms: true,
      //   scroll: false
      // }
    });
  }

  reloadServer() {
    browserSync.reload();
  }

  announceCompletion(result) {
    this.ui.writeSuccess(this.completionMessage);
    const err = errorFilter(result.stderr, this.showWarnings).join('\n');
    if (err) {
      this.ui.writeInfo(err);
    }
  }

  annouceFailure(result) {
    this.ui.writeError(this.errorMessage);
    const err = errorFilter(result.stderr, this.showWarnings).join('\n');
    if (err) {
      this.ui.writeInfo(err);
    }
    return Promise.reject(err);
  }

  writeProgress(result) {
    const _this = this;
    result.stdout.on('data', (data) => {
      if (_this.showFullLog) {
        _this.ui.writeInfo(data);
      } else {
        const err = errorFilter(data, this.showWarnings).join('\n');
        if (err) {
          _this.ui.writeError(err);
        }
      }
    });

    result.stderr.on('data', (data) => {
      const err = errorFilter(data, this.showWarnings).join('\n');
      if (err) {
        _this.ui.writeError(err);
      }
    });
  }
}

module.exports = ServeTask;
