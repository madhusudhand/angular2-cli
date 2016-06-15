'use strict';

const Promise     = require('bluebird');
const globals     = require('../cli/globals');
const Task        = require('./task');
const PugCompile  = require('../compile/pug');
const TsCompile   = require('../compile/typescript');
const SassCompile = require('../compile/sass');
const LessCompile = require('../compile/less');

class Compile extends Task {
  constructor(args) {
    super(Object.assign({
      src  : globals.sourceDir,
      dest : globals.buildDir,
      p    : new PugCompile(),
      t    : new TsCompile(),
      s    : new SassCompile(),
      l    : new LessCompile(),
    }, args));
  }

  run(env) {
    const _this = this;

    return Promise.resolve().
      then(() => _this.pug(env)).
      then(() => _this.ts(env)).
      then(() => _this.sass(env)).
      then(() => _this.less(env));
  }

  pug(env) {
    return this.p.compile(this.src, this.dest, env);
  }

  ts(env) {
    return this.t.compile(this.src, this.dest, env);
  }

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
