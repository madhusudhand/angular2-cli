'use strict';

const Promise     = require('bluebird');
const globals     = require('../cli/globals');
const Task        = require('./task');

const webpack     = require('webpack');
const getConfig   = require('../webpack/config/webpack.config');

class Compile extends Task {
  constructor(args) {
    super(Object.assign({
      src  : globals.sourceDir,
      dest : globals.buildDir,
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
