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
    let _this = this;
    this.options = objectAssign({}, this.options, options);

    this.npmInstall().
      then(function() {
        // _this.typingsInstall();
        var typings = require('typings-core');

        return typings.install({
          cwd: process.cwd()
        });
      });
  },
  npmInstall: function() {
    let npmInstallTask = require('../../tasks/npm-install');

    let npm = new npmInstallTask();
    npm.dir = path.resolve('./');
    npm.ui = ui;

    return pkg.read(npm.dir).
    then(function (data) {

      if (data.dependencies.angular2 === "*") {
        npm.new = true;
      }
      return Promise.resolve(npm.run());

    }).
    catch(function(err) {
      ui.writeError(err)
    });
  },
  typingsInstall: function() {
    let typingsInstallTask = require('../../tasks/typings-install');
    let typings = new typingsInstallTask();
    typings.dir = path.resolve('./');
    typings.ui = ui;

    return typings.run({});
  }
});
