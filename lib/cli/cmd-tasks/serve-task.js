'use strict';


let Promise = require('promise');
let objectAssign = require('object-assign');
let path = require('path');

let Task = require('../../tasks/base/task');
let ui = require('../../ui/progress-dots');

module.exports = Task.extend({
  init: function() {
  },
  run: function() {
    let npmBuildTask = require(path.join(__dirname, '..', '..', 'tasks/build-dev'));
    let npm = new npmBuildTask();
    npm.ui = ui;

    let serveTask = require(path.join(__dirname, '..', '..', 'tasks/serve'));
    let serve = new serveTask();
    serve.ui = ui;

    npm.run({}).
      then(function() {
        serve.run({});
      });
  }
});
