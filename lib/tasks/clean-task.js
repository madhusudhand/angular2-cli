'use strict';

const fs      = require('fs-extra');
const path    = require('path');
const Promise = require('promise');
const globals = require('../cli/globals');
const Task    = require('./task');

class CleanTask extends Task {
  constructor(args) {
    super(Object.assign({
      buildDir : globals.buildDir,
      tempDir  : globals.tempDir,
    }, args));
  }

  run() {
    const remove = Promise.denodeify(fs.remove);
    const dir = path.resolve('./');

    return Promise.all([
      remove(`${dir}/${this.buildDir}`),
      remove(`${dir}/${this.tempDir}`),
    ]);
  }
}

module.exports = CleanTask;
