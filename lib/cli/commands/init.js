'use strict';

let InitTask = require('../cmd-tasks/init-task');
let objectAssign = require('object-assign');

module.exports = function init(appName, options) {

  let init = new InitTask();
  init.run(objectAssign({}, options, {
    appName: appName
  }));

};
