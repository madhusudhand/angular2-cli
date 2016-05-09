'use strict';

const pug = require('pug');

class PugCompile {
  constructor(options) {
    this.options = Object.assign({
      pretty: false,
      compileDebug: false,
    }, options);
  }

  compile(src) {
    const fn = pug.compile('', this.options);
    fn(src);
  }
}

module.exports = PugCompile;
