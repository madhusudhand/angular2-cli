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
    let NpmBuildTask = require(path.join(__dirname, '..', '..', 'tasks/build-dev'));
    let npm = new NpmBuildTask();
    npm.ui = ui;

    let ServeTask = require(path.join(__dirname, '..', '..', 'tasks/serve'));
    let serve = new ServeTask();
    serve.ui = ui;

    npm.run({}).
      then(function() {
        serve.run({});
      });
  }
});
