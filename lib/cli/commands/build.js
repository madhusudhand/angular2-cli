'use strict';

const Command = require('./command');
const ui      = require('../../ui/progress-dots');
const Build   = require('../../tasks/build');

class BuildCmd extends Command {
  run() {
    this.validate().
      then(() => {
        Build.new({ ui }).run();
      });
  }
}

module.exports = function serve() {
  const cmd = new BuildCmd();
  cmd.run();
};
