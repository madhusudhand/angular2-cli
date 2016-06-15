'use strict';

const fs      = require('fs-extra');
const path    = require('path');
const Promise = require('bluebird');
const globals = require('../cli/globals');
const Task    = require('./task');

class Clean extends Task {
  constructor(args) {
    super(Object.assign({
      buildDir : globals.buildDir,
      tempDir  : globals.tempDir,
    }, args));
  }

  run() {
    const remove = Promise.promisify(fs.remove);
    const dir = path.resolve('./');

    return Promise.all([
      remove(`${dir}/${this.buildDir}`),
      remove(`${dir}/${this.tempDir}`),
    ]);
  }
}

module.exports = {
  new : (args) => new Clean(args),
};
