'use strict';

const fs      = require('fs-extra');
const Promise = require('promise');
const globals = require('../cli/globals');
const Task    = require('./base/task');

class CopyTask extends Task {
  constructor(args) {
    super(Object.assign({}, args));
    this.copy = Promise.denodeify(this.cp);
  }

  run() {
    const _this = this;
    return _this.copyAngular().
      then(() => _this.copyAssets()).
      then(() => _this.copyMisc());
  }

  copyAngular() {
    const dest = `${globals.buildDir}/${globals.vendorDir}/`;
    const files = [];
    for (const file of globals.libraries.angular) {
      files.push({ src: `node_modules/${file}`, dest: dest + file });
    }

    return this.copy(files);
  }

  copyAssets() {
    const file = [{
      src  : `${globals.sourceDir}/${globals.assetsDir}`,
      dest : `${globals.buildDir}/${globals.assetsDir}`,
    }];

    return this.copy(file);
  }

  copyMisc() {
    const file = [{
      src  : `${globals.sourceDir}/.htaccess`,
      dest : `${globals.buildDir}/.htaccess`,
    }];

    return this.copy(file);
  }

  copyThirdparty() {

  }

  cp(files, callback) {
    if (!Array.isArray(files)) {
      callback('error');
    }
    for (const file of files) {
      fs.copy(file.src, file.dest);
    }
    callback();
  }
}

module.exports = CopyTask;
