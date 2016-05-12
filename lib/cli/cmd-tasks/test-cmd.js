'use strict';

const Task      = require('../../tasks/base/task');
const ui        = require('../../ui/progress-dots');
const TestTask  = require('../../tasks/test');

class TestCmd extends Task {
  run() {
    const test = new TestTask({
      ui,
    });

    test.run();
  }
}

module.exports = TestCmd;
