'use strict';

const watch = require('chokidar');
const Task = require('./base/task');
const logger = require('../util/logger');

class Watcher extends Task {
  constructor(args) {
    super(Object.assign({}, { config: args }));
  }

  run() {
    const watcher = this._watcher();

    watcher.on('add', this._onAdd);
    watcher.on('change', this._onChange);
    watcher.on('unlink', this._onDelete);
    watcher.on('ready', this._onReady);
    watcher.on('error', this._onError);
  }

  _watcher() {
    const watchConfig = Object.assign({}, {
      ignored: this._ignore,
      ignoreInitial: true,
      persistent: true,
      interval: 100,
      binaryInterval: 300,
      usePolling: true,
    });
    return watch.watch(this.config.dir, watchConfig);
  }

  _ignore() { // name
    return false;
  }

  _onReady() {
    // logger.writeInfo('watching...');
  }

  _onAdd(file) {
    logger.writeInfo(`added : ${file}`);
  }

  _onChange(file) { // stats
    logger.writeInfo(`changed : ${file}`);
  }

  _onDelete() {
    logger.writeInfo('delete');
  }

  _onError(error) {
    logger.writeWarning(`File watching error: ${error}`);
  }
}

module.exports = Watcher;
