'use strict';

const fs      = require('fs-extra');
const Promise = require('bluebird');
const path    = require('path');
const Make    = require('./make');
const fsUtil  = require('../util/fs-util');
const logger  = require('../ui/logger');

class MakeDirective extends Make {

  validate() {
    if (!this.options.name) {
      logger.writeError('Give a name to the Directive.');
      return false;
    }
    return true;
  }

  create() {
    const dirName = this.dashedString(this.options.name);
    const dir = path.resolve(`${this.options.path}/${dirName}.directive`);

    if (!fsUtil.dir.touch(dir)) {
      logger.writeError(`Directive with same name already exists. [${dir}]`);
      return null;
    }
    this.dir = dir;
    return dir;
  }

  copy() {
    const cp = Promise.promisify(fs.copy);
    const source = path.join(__dirname, '..', '..', 'blueprints', 'scaffolds', 'directive');

    return cp(source, this.dir).
      catch(() => {
        logger.writeError('Directive generation failed.');
      });
  }

  postInstall() {
    this.addBarrel(this.dir, 'directive');
  }

  placeholders() {
    return {
      selector         : this.dashedString(this.options.name),
      moduleName       : this.titleCaseString(this.options.name),
      dashedModuleName : this.dashedString(this.options.name),
    };
  }
}

module.exports = {
  create : () => new MakeDirective(),
};
