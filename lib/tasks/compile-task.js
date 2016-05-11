'use strict';

const Promise     = require('promise');
const globals     = require('../cli/globals');
const Task        = require('./base/task');
const PugCompile  = require('../compile/pug');
const TsCompile   = require('../compile/typescript');
const SassCompile = require('../compile/sass');
const LessCompile = require('../compile/less');

class CompileTask extends Task {
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
    _this.env = env;

    return Promise.resolve().
      then(() => _this.pug()).
      then(() => _this.typescript()).
      then(() => _this.sass()).
      then(() => _this.less());
  }

  pug() {
    return this.p.compile(this.src, this.dest);
  }

  typescript() {
    return this.t.compile(this.src, this.dest);
  }

  sass() {
    return this.s.compile(this.src, this.dest);
  }

  less() {
    return this.l.compile(this.src, this.dest);
  }
}

module.exports = CompileTask;
