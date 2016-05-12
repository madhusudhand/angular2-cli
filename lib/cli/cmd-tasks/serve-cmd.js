'use strict';

const Command = require('./cmd');
const ui      = require('../../ui/progress-dots');
const Build   = require('../../tasks/build');
const Serve   = require('../../tasks/serve');

class ServeCmd extends Command {
  run() {
    Build.new({ ui }).run().
      then(() => {
        Serve.new({ ui }).run();
      });
  }
}

module.exports = {
  new : (args) => new ServeCmd(args),
};
