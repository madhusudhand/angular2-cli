'use strict';

const Promise            = require('promise');
const browserSync        = require('browser-sync').create();
const historyApiFallback = require('connect-history-api-fallback');

const Task = require('./base/task');
const logger = require('../ui/logger');
const globals = require('../cli/globals');
const Watcher = require('../tasks/watch-task');

class ServeTask extends Task {
  constructor(args) {
    super(Object.assign({
      errorMessage : 'Error launching App.',
      showWarnings : false,
      showFullLog  : false,
    }, args));
  }

  run(options) {
    this.npmOptions = Object.assign({}, options);
    // this.ui.writeInfo(this.startMessage);

    this.startServer();
    const watch = new Watcher({ dir: globals.sourceDir });
    watch.run(this.reloadServer.bind(this));

    return Promise.resolve();
  }

  startServer() {
    browserSync.init({
      server     : `./${globals.buildDir}`,
      notify     : false,
      middleware : [historyApiFallback()],
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

module.exports = ServeTask;
