'use strict';

const fs        = require('fs-extra');
const path      = require('path');
const Promise   = require('bluebird');
const Task      = require('./task');
const appRoot   = path.resolve('./');
const appConfig = require(`${appRoot}/src/app-config`);

class Clean extends Task {
  constructor(args) {
    super(Object.assign({}, args));
  }

  run() {
    const remove = Promise.promisify(fs.remove);
    const dir = path.resolve('./');

    return Promise.all([
      remove(`${dir}/${appConfig.app.buildDir}`),
      remove(`${dir}/${appConfig.app.tempDir}`),
    ]);
  }
}

module.exports = {
  new : (args) => new Clean(args),
};
