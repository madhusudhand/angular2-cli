'use strict';

const Promise     = require('bluebird');
const globals     = require('../cli/globals');
const Task        = require('./task');

const webpack     = require('webpack');
const config      = require('../webpack/webpack.config');

class Compile extends Task {
  constructor(args) {
    super(Object.assign({
      src  : globals.sourceDir,
      dest : globals.buildDir,
    }, args));
  }

  run(env) {
    this.compiler = this.compiler || webpack(config(env || 'dev'));
    return new Promise((resolve, reject) => {
      this.compiler.run((err) => {
        if (err) {
          reject(err.message);
        }
        resolve();
      });
    });
  }
}

module.exports = {
  new : (args) => new Compile(args),
};
