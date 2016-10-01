'use strict';

const Promise     = require('bluebird');
const webpack     = require('webpack');
const path        = require('path');

const Task        = require('./task');
const getConfig   = require('../webpack/config/webpack.config');
const appRoot     = path.resolve('./');
const appConfig   = require(`${appRoot}/src/app-config`);

class Compile extends Task {
  constructor(args) {
    super(Object.assign({
      src  : appConfig.app.appDir,
      dest : appConfig.app.buildDir,
    }, args));
  }

  run(env) {
    const config = getConfig({ env: env || 'dev', serve: this.serve });
    this.compiler = this.compiler || webpack(config);

    return new Promise((resolve, reject) => {
      this.compiler.run((err) => {
        if (err) {
          reject(err.message);
        }
        resolve({ compiler: this.compiler, serveOptions: {} });
      });
    });
  }
}

module.exports = {
  new : (args) => new Compile(args),
};
