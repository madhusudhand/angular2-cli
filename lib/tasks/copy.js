'use strict';

const path       = require('path');
const fs         = require('fs-extra');
const Promise    = require('bluebird');
const ncpAsync   = require('ncp').ncp;
const Task       = require('./task');
// const fsUtil     = require('../util/fs-util');
const buildFiles = require(path.resolve('./build-config'));
const appRoot    = path.resolve('./');
const appConfig  = require(`${appRoot}/src/app-config`);

class Copy extends Task {
  constructor(args) {
    super(Object.assign({}, args));
    this.copy = Promise.promisify(this.cp);
    this.ncp = Promise.promisify(ncpAsync);
  }

  run() {
    const _this = this;
    return _this.copyAssets().
      then(() => _this.copyMisc());
      // then(() => _this.copyThirdparty());
  }

  copyAssets() {
    const file = [{
      src  : `src/${appConfig.app.assetsDir}`,
      dest : `${appConfig.app.buildDir}/${appConfig.app.assetsDir}`,
    }];

    return this.copy(file);
  }

  copyMisc() {
    const sources = buildFiles.otherFiles.map((f) => {
      if (typeof f === 'object') {
        return { src: f.src, dest: `${f.dest}/${path.basename(f.src)}` };
      }
      return { src: f, dest: `${appConfig.app.buildDir}/${path.basename(f)}` };
    });
    return this.copy(sources);
  }

  copyThirdparty() {
    const file = [];
    return this.copy(file);
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

module.exports = {
  new : (args) => new Copy(args),
};
