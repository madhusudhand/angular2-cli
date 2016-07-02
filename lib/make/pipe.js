'use strict';

const fs      = require('fs-extra');
const Promise = require('bluebird');
const path    = require('path');
const Make    = require('./make');
const fsUtil  = require('../util/fs-util');
const logger  = require('../ui/logger');

class MakePipe extends Make {

  validate() {
    if (!this.options.name) {
      logger.writeError('Give a name to the Pipe.');
      return false;
    }
    return true;
  }

  create() {
    const dirName = this.dashedString(this.options.name);
    const dir = path.resolve(`${this.options.path}/${dirName}.pipe`);

    if (!fsUtil.dir.touch(dir)) {
      logger.writeError(`Pipe with same name already exists. [${dir}]`);
      return null;
    }
    this.dir = dir;
    return dir;
  }

  copy() {
    const cp = Promise.promisify(fs.copy);
    const source = path.join(__dirname, '..', '..', 'blueprints', 'scaffolds', 'pipe');

    return cp(source, this.dir).
      catch(() => {
        logger.writeError('Pipe generation failed.');
      });
  }

  postInstall() {
    this.addBarrel(this.dir, 'pipe');
  }

  placeholders() {
    return {
      moduleName       : this.titleCaseString(this.options.name),
      dashedModuleName : this.dashedString(this.options.name),
    };
  }
}

module.exports = {
  create : () => new MakePipe(),
};
