'use strict';

const Promise     = require('bluebird');
const globals     = require('../cli/globals');
const Task        = require('./task');
const PugCompile  = require('../compile/pug');
// const TsCompile   = require('../compile/typescript');
const SassCompile = require('../compile/sass');
const LessCompile = require('../compile/less');

const webpack     = require('webpack');
const config      = require('../webpack/webpack.dev.config');

class Compile extends Task {
  constructor(args) {
    super(Object.assign({
      src  : globals.sourceDir,
      dest : globals.buildDir,
      p    : new PugCompile(),
      s    : new SassCompile(),
      l    : new LessCompile(),
    }, args));
  }

  run(env) {
    const _this = this;

    const compiler = webpack(config);
    // this.compile = Promise.promisify(compiler.run);
    // return this.compile();
    return Promise.resolve().
      then(() => {
        compiler.run((err) => {
          if (err) {
            Promise.reject(err);
          }
        });
        return Promise.resolve();
      }).
      then(() => _this.pug(env)).
      // then(() => _this.ts(env)).
      then(() => _this.sass(env)).
      then(() => _this.less(env));
  }

  pug(env) {
    return this.p.compile(this.src, this.dest, env);
  }

  // ts(env) {
  //   return this.t.compile(this.src, this.dest, env);
  // }

  sass(env) {
    return this.s.compile(this.src, this.dest, env);
  }

  less(env) {
    return this.l.compile(this.src, this.dest, env);
  }
}

module.exports = {
  new : (args) => new Compile(args),
};
