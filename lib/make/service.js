'use strict';

const fs      = require('fs-extra');
const Promise = require('bluebird');
const path    = require('path');
const Make    = require('./make');
const fsUtil  = require('../util/fs-util');
const logger  = require('../ui/logger');

class MakeService extends Make {
  validate() {
    if (!this.options.name) {
      logger.writeError('Give a name to the Service.');
      return false;
    }
    return true;
  }

  create() {
    const dirName = this.dashedString(this.options.name);
    const dir = path.resolve(`${this.options.path}/${dirName}.service`);

    if (!fsUtil.dir.touch(dir)) {
      logger.writeError(`Service with same name already exists. [${dir}]`);
      return null;
    }
    this.dir = dir;
    return dir;
  }

  copy() {
    const cp = Promise.promisify(fs.copy);
    const source = path.join(__dirname, '..', '..', 'blueprints', 'scaffolds', 'service');

    return cp(source, this.dir).
      catch(() => {
        logger.writeError('Service generation failed.');
      });
  }

  postInstall() {
    this.addBarrel(this.dir, 'service');
  }

  placeholders() {
    return {
      moduleName       : this.titleCaseString(this.options.name),
      dashedModuleName : this.dashedString(this.options.name),
    };
  }
}

module.exports = {
  create : () => new MakeService(),
};
