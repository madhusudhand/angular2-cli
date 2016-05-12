'use strict';

const ServeCmd = require('../cmd-tasks/serve-cmd');

module.exports = function serve() {
  ServeCmd.new().run();
};
