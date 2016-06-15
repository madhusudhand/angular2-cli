'use strict';

const _       = require('lodash');
const Command = require('./command');
const fsUtil  = require('../../util/fs-util');
const ui      = require('../../ui/progress-dots');
const Create  = require('../../tasks/create');

class CreateCmd extends Command {
  run(options) {
    this.options = Object.assign({}, this.options, options);

    if (this.validate()) {
      this.blueprintInstall();
    }
  }

  validate() {
    if (!_.some(['less', 'sass'], (option) => option === this.options.cssProcessor)) {
      ui.writeError(`[${this.options.cssProcessor}]: not a valid value with -c, --css-processor`);
      return false;
    }
    return true;
  }

  createDir() {
    const dir = `./${this.options.appName}`;
    if (!fsUtil.dir.touch(dir)) {
      ui.writeError('Directory with same name already exists.');
      return null;
    }
    return dir;
  }

  blueprintInstall() {
    this.dir = this.createDir();
    return !this.dir || Create.new({
      ui,
      options : this.options,
    }).run({ dir: this.dir });
  }
}

module.exports = function create(appName, options) {
  const cmd = new CreateCmd();
  cmd.run(Object.assign({}, options, {
    appName,
  }));
};
