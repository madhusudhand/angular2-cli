'use strict';

const TestCmd = require('../cmd-tasks/test-cmd');

module.exports = function test() {
  const cmd = new TestCmd();
  cmd.run();
};
