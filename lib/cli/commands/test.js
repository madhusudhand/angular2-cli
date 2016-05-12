'use strict';

const TestCmd = require('../cmd-tasks/test-cmd');

module.exports = function test() {
  TestCmd.new().run();
};
