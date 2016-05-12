'use strict';

const Command = require('./cmd');
const ui      = require('../../ui/progress-dots');
const Test    = require('../../tasks/test');

class TestCmd extends Command {
  run() {
    Test.new({ ui }).run();
  }
}

module.exports = {
  new : (args) => new TestCmd(args),
};
