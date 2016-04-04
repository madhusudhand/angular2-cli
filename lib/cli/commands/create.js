'use strict';

let CreateTask = require('../cmd-tasks/create-task');
let objectAssign = require('object-assign');

module.exports = function create(appName, options) {

  let create = new CreateTask();
  create.run(objectAssign({}, options, {
    appName: appName
  }));

};
