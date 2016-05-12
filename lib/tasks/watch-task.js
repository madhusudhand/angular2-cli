'use strict';

const watch       = require('chokidar');
const Task        = require('./task');
const logger      = require('../ui/logger');
const CompileTask = require('./compile-task');

class WatchTask extends Task {
  constructor(args) {
    super(Object.assign({}, { config: args }));
    this.compile = new CompileTask();
  }

  run(callback) {
    const watcher = this._watcher();
    this.callback = callback;

    watcher.on('add', this._onAdd.bind(this));
    watcher.on('change', this._onChange.bind(this));
    watcher.on('unlink', this._onDelete.bind(this));
    watcher.on('ready', this._onReady.bind(this));
    watcher.on('error', this._onError.bind(this));
  }

  _watcher() {
    const watchConfig = Object.assign({}, {
      ignored        : this._ignore,
      ignoreInitial  : true,
      persistent     : true,
      interval       : 100,
      binaryInterval : 300,
      usePolling     : true,
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
    this._compile(file);
  }

  _onChange(file) { // stats
    logger.writeInfo(`changed : ${file}`);
    this._compile(file).
      then(() => {
        this.callback();
      });
  }

  _onDelete(file) {
    logger.writeInfo(`deleted : ${file}`);
  }

  _onError(error) {
    logger.writeWarning(`File watching error: ${error}`);
  }

  _getFileType(file) {
    return file.replace(/.*[\.\/\\]/, '').toLowerCase();
  }

  _compile(file) {
    switch (this._getFileType(file)) {
      case 'pug':
        return this.compile.pug();
      case 'ts':
        return this.compile.ts();
      case 'scss':
        return this.compile.sass();
      case 'less':
        return this.compile.less();
      default:
        // nothing to compile
    }
    return Promise.resolve();
  }
}

module.exports = WatchTask;
