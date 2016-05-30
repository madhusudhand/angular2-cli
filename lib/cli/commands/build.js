'use strict';

const Command = require('./command');
const ui      = require('../../ui/progress-dots');
const Build   = require('../../tasks/build');

class BuildCmd extends Command {
  run(options) {
    this.validate().
      then(() => {
        Build.new({ ui, env: options.env }).run();
      });
  }
}

module.exports = (options) => {
  const env = options.prod ? 'prod' : 'dev';
  const cmd = new BuildCmd();
  cmd.run({ env });
};
