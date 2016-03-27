'use strict';


let Promise = require('promise');
let objectAssign = require('object-assign');
let path = require('path');

let Task = require('../../tasks/base/task');
let fsUtil = require('../../util/fs-util');
let uiBase = require('../../ui/base/ui');
let ui = new uiBase();

module.exports = Task.extend({
  init: function() {
  },
  run: function(options) {
    this.options = objectAssign({}, this.options, options);
    this.dir = this.createDir();
    if (this.dir === null) {
      return;
    }

    Promise.resolve(this.blueprintInstall()).
      then(this.npmInstall());

  },
  createDir: function() {
    const dir = path.resolve('./' + this.options.appName);
    if ( !fsUtil.dir.touch(dir) ) {
      ui.writeError('Error: Directory with same name already exists.');
      return null;
    }
    return dir;
  },
  blueprintInstall: function() {
    let bpInstallTask = require('../../tasks/blueprint-install');
    let blueprint = new bpInstallTask();
    blueprint.ui = ui;

    blueprint.run({dir: this.dir}).
      then(null, function(err) {
        npmUi.writeError('Project creation failed.');
        Promise.reject(err);
      });
  },
  npmInstall: function() {
    let npmInstallTask = require('../../tasks/npm-install');
    let npmUi = require('../../ui/npm');

    let npm = new npmInstallTask();
    npm.dir = this.dir;
    npm.ui = npmUi;

    npm.run({}).
      then(null, function(err) {
        npmUi.writeError('Failed to install packages via npm.');
        Promise.reject(err);
      });
  }
});
