'use strict';

const path    = require('path');
const Make    = require('./make');
const fsUtil  = require('../util/fs-util');

class MakeDirective extends Make {
  make(options) {
    Object.assign(this.options, options);
    return this.createDir();
  }

  createDir() {
    if (!this.options.name) {
      return null;
    }
    const dir = path.resolve(`${this.options.path}/${this.options.name}.directive`);
    if (!fsUtil.dir.touch(dir)) {
      // ui.writeError('Directory with same name already exists.');
      return null;
    }
    return dir;
  }
}

module.exports = {
  create : () => new MakeDirective(),
};
