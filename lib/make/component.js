'use strict';

const fs      = require('fs-extra');
const Promise = require('promise');
const path    = require('path');
const Make    = require('./make');
const fsUtil  = require('../util/fs-util');

class MakeComponent extends Make {
  make(options) {
    Object.assign(this.options, options);
    return this.createDir();
  }

  createDir() {
    if (!this.options.name) {
      return null;
    }
    const dir = path.resolve(`${this.options.path}/${this.options.name}.component`);
    if (!fsUtil.dir.touch(dir)) {
      // ui.writeError('Directory with same name already exists.');
      return null;
    }
    return dir;
  }

  copy() {
    const cp = Promise.denodeify(fs.copy);
    const commonSource = path.join(__dirname, '..', '..', 'blueprints', 'scaffolds', 'component');

    return cp(commonSource, 'src/public').
      then(() => {
        console.log('hi');
      }).
      catch(() => {
        console.log('Error');
      });
  }
}

module.exports = {
  create : () => new MakeComponent(),
};
