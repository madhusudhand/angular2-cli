'use strict';

let Promise = require('promise');
let objectAssign = require('object-assign');
let path = require('path');

let Task = require('../../tasks/base/task');
let fsUtil = require('../../util/fs-util');
let ui = require('../../ui/progress-dots');

module.exports = Task.extend({
  init: function() {
  },
  run: function(options) {
    this.options = objectAssign({}, this.options, options);
    this.dir = this.createDir();
    if (this.dir === null) {
      return;
    }

    Promise.resolve(this.blueprintInstall());

  },
  createDir: function() {
    const dir = path.resolve('./' + this.options.appName);
    if ( !fsUtil.dir.touch(dir) ) {
      ui.writeError('Directory with same name already exists.');
      return null;
    }
    return dir;
  },
  blueprintInstall: function() {
    let bpInstallTask = require('../../tasks/blueprint-install');
    let blueprint = new bpInstallTask();
    blueprint.ui = ui;

    return blueprint.run({dir: this.dir});
  }
});
