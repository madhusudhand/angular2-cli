'use strict';

const Command = require('./command');
const ui      = require('../../ui/progress-dots');
const Build   = require('../../tasks/build');
const Serve   = require('../../tasks/serve');

class ServeCmd extends Command {
  run() {
    this.validate().
      then(() => {
        Build.new({ ui }).run().
          then(() => {
            Serve.new({ ui }).run();
          });
      });
  }
}

module.exports = function serve() {
  const cmd = new ServeCmd();
  cmd.run();
};
