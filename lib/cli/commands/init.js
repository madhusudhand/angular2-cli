'use strict';

const InitCmd = require('../cmd-tasks/init-cmd');

module.exports = function init(appName, options) {
  const cmd = new InitCmd();
  cmd.run(Object.assign({}, options, {
    appName,
  }));
};
