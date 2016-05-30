'use strict';

const fs      = require('fs-extra');
const Promise = require('promise');
const ncp     = require('ncp').ncp;
const globals = require('../cli/globals');
const Task    = require('./task');
const fsUtil  = require('../util/fs-util');

class Copy extends Task {
  constructor(args) {
    super(Object.assign({}, args));
    this.copy = Promise.denodeify(this.cp);
  }

  run() {
    const _this = this;
    return _this.copyAssets().
      then(() => _this.copyAngular());
      // then(() => _this.copyMisc());
  }

  copyAngular() {
    const targetDir = `./${globals.buildDir}/${globals.vendorDir}`;
    const libs = ['@angular', 'rxjs', 'systemjs', 'zone.js', 'reflect-metadata'];
    const sources = libs.map((l) => `node_modules/${l}`);
    const dest = libs.map((l) => `${targetDir}/${l}`);

    // create vendir directory
    fsUtil.dir.touch(targetDir);

    const copy = Promise.denodeify(ncp);

    return sources.reduce((promise, source, index) =>
      promise.then(() =>
        copy(source, dest[index])
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
    const file = [];
    return this.copy(file);
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
