'use strict';

let objectAssign = require('object-assign');

let Task = require('../../tasks/base/task');
let ui = require('../../ui/progress-dots');
let pkg = require('../../util/pkg');
var path = require('path');

module.exports = Task.extend({
  init: function() {
  },
  run: function(options) {
    this.options = objectAssign({}, this.options, options);

    this.npmInstall();
  },
  npmInstall: function() {
    let npmInstallTask = require('../../tasks/npm-install');

    let npm = new npmInstallTask();
    npm.dir = path.resolve('./');
    npm.ui = ui;

    pkg.read(npm.dir).
    then(function (data) {

      if (data.dependencies.angular2 === "*") {
        npm.new = true;
      }
      npm.run({});

    }).
    catch(function(err) {
      ui.writeError(err)
    });

  }
});
