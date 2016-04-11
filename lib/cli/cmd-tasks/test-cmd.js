'use strict';

let Promise = require('promise');
let objectAssign = require('object-assign');
let path = require('path');

let Task = require('../../tasks/base/task');
let ui = require('../../ui/progress-dots');

let npm = require('../../util/npm');

module.exports = Task.extend({
  init: function() {
  },
  run: function() {
    let TestTask = require(path.join(__dirname, '..', '..', 'tasks/test'));
    let test = new TestTask();
    test.ui = ui;

    test.run({});
  }
});
