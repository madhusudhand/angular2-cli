'use strict';


let Promise = require('promise');
let objectAssign = require('object-assign');
let path = require('path');

let Task = require('../../tasks/base/task');
let ui = require('../../ui/build');

module.exports = Task.extend({
  init: function() {
  },
  run: function() {
    let npmBuildTask = require(path.join(__dirname, '..', '..', 'tasks/npm-build-dev'));
    let npm = new npmBuildTask();
    npm.ui = ui;

    npm.run({});
  }
});