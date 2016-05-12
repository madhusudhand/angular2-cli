'use strict';

const InitCmd = require('../cmd-tasks/init-cmd');

module.exports = function init(appName, options) {
  InitCmd.new().run(Object.assign({}, options, {
    appName,
  }));
};
