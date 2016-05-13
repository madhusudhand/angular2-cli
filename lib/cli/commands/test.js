'use strict';

const Command = require('./command');
const ui      = require('../../ui/progress-dots');
const Test    = require('../../tasks/test');

class TestCmd extends Command {
  run() {
    this.validate().
      then(() => {
        Test.new({ ui }).run();
      });
  }
}

module.exports = function test() {
  const cmd = new TestCmd();
  cmd.run();
};
