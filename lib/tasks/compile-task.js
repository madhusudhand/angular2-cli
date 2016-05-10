'use strict';

const Promise = require('promise');
const globals = require('../cli/globals');
const Task = require('./base/task');
const PugCompile = require('../compile/pug');
const TsCompile = require('../compile/typescript');
const SassCompile = require('../compile/sass');
const LessCompile = require('../compile/less');

class CompileTask extends Task {
  constructor(args) {
    super(Object.assign({
      script: '',
      startProgressMessage: '',
      completionMessage: '',
      errorMessage: '',
    }, args));

    this.src = globals.sourceDir;
    this.dest = globals.buildDir;
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
    const pug = new PugCompile();
    return pug.compile(this.src, this.dest);
  }

  typescript() {
    const ts = new TsCompile();
    return ts.compile(this.src, this.dest);
  }

  sass() {
    const sass = new SassCompile();
    return sass.compile(this.src, this.dest);
  }

  less() {
    const less = new LessCompile();
    return less.compile(this.src, this.dest);
  }
}

module.exports = CompileTask;
