'use strict';

const Command   = require('./cmd');
const ui        = require('../../ui/progress-dots');
const TestTask  = require('../../tasks/test');

class TestCmd extends Command {
  run() {
    const test = new TestTask({
      ui,
    });

    test.run();
  }
}

module.exports = TestCmd;
