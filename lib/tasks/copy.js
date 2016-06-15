'use strict';

const path    = require('path');
const fs      = require('fs-extra');
const Promise = require('bluebird');
const ncpAsync = require('ncp').ncp;
const globals = require('../cli/globals');
const Task    = require('./task');
const fsUtil  = require('../util/fs-util');
const buildFiles   = require(path.resolve('./angular-build'));

class Copy extends Task {
  constructor(args) {
    super(Object.assign({}, args));
    this.copy = Promise.promisify(this.cp);
    this.ncp = Promise.promisify(ncpAsync);
  }

  run() {
    const _this = this;
    return _this.copyAssets().
      then(() => _this.copyAngular()).
      then(() => _this.copyMisc());
      // then(() => _this.copyThirdparty());
  }

  copyAngular() {
    const targetDir = `./${globals.buildDir}/${globals.vendorDir}`;
    const sources = buildFiles.vendorNpmFiles.map((l) => `node_modules/${l}`);
    const dest = buildFiles.vendorNpmFiles.map((l) => `${targetDir}/${l}`);

    // create vendir directory
    fsUtil.dir.touch(targetDir);

    return sources.reduce((promise, source, index) =>
      promise.then(() =>
        this.ncp(source, dest[index], {})
      )
    , Promise.resolve());
  }

  copyAssets() {
    const file = [{
      src  : `${globals.sourceDir}/${globals.assetsDir}`,
      dest : `${globals.buildDir}/${globals.assetsDir}`,
    }];

    return this.copy(file);
  }

  copyMisc() {
    const sources = buildFiles.otherFiles.map((f) => {
      if (typeof f === 'object') {
        return { src: f.src, dest: `${f.dest}/${path.basename(f.src)}` };
      }
      return { src: f, dest: `dist/${path.basename(f)}` };
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
