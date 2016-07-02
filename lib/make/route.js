'use strict';

const fs      = require('fs-extra');
const Promise = require('bluebird');
const path    = require('path');
const Make    = require('./make');
const fsUtil  = require('../util/fs-util');
const logger  = require('../ui/logger');

class MakeRoute extends Make {
  validate() {
    if (!this.options.name) {
      logger.writeError('Give a name to the route.');
      return false;
    }
    return true;
  }

  create() {
    const dirName = this.dashedString(this.options.name);
    const dir = path.resolve(`${this.options.path}/+${dirName}`);
    const component = `${dir}/${dirName}.component`;

    if (!fsUtil.dir.touch(dir)) {
      logger.writeError(`Route with same name already exists. [${dir}]`);
      return null;
    }
    if (!fsUtil.dir.touch(component)) {
      logger.writeError('Unable to create component for the route.');
      return null;
    }
    this.dir = component;
    return component;
  }

  copy() {
    const cp = Promise.promisify(fs.copy);
    const source = path.join(__dirname, '..', '..', 'blueprints', 'scaffolds', 'component');

    return cp(source, this.dir).
      catch(() => {
        logger.writeError('Component generation failed.');
      });
  }

  postInstall() {
    this.addBarrel(this.dir, 'route');
  }

  placeholders() {
    return {
      selector         : this.dashedString(this.options.name),
      moduleName       : this.titleCaseString(this.options.name),
      dashedModuleName : this.dashedString(this.options.name),
      className        : this.dashedString(this.options.name),
    };
  }
}

module.exports = {
  create : () => new MakeRoute(),
};
