'use strict';

const Promise       = require('promise');
const path          = require('path');
const _             = require('lodash');
const Task          = require('../../tasks/base/task');
const fsUtil        = require('../../util/fs-util');
const ui            = require('../../ui/progress-dots');
const BlueprintTask = require('../../tasks/blueprint-task');

class CreateCmd extends Task {
  run(options) {
    this.options = Object.assign({}, this.options, options);

    if (!this.validateCommand()) {
      return;
    }

    this.dir = this.createDir();
    if (this.dir === null) {
      return;
    }

    Promise.resolve(this.blueprintInstall());
  }

  validateCommand() {
    if (!_.some(['less', 'sass'], (option) => option === this.options.cssProcessor)) {
      ui.writeError(`[${this.options.cssProcessor}]: not a valid value with -c, --css-processor`);
      return false;
    }
    return true;
  }

  createDir() {
    const dir = path.resolve(`./${this.options.appName}`);
    if (!fsUtil.dir.touch(dir)) {
      ui.writeError('Directory with same name already exists.');
      return null;
    }
    return dir;
  }

  blueprintInstall() {
    const blueprint = new BlueprintTask({
      ui,
      cssProcessor : this.options.cssProcessor,
    });

    return blueprint.run({ dir: this.dir });
  }
}

module.exports = CreateCmd;
