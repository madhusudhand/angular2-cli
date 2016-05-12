'use strict';

const Command   = require('./cmd');
const ui        = require('../../ui/progress-dots');
const BuildTask = require('../../tasks/build-task');
const ServeTask = require('../../tasks/serve-task');

class ServeCmd extends Command {
  run() {
    const build = new BuildTask({
      ui,
    });

    const serve = new ServeTask({
      ui,
    });

    build.run().
      then(() => {
        serve.run();
      });
  }
}

module.exports = ServeCmd;
