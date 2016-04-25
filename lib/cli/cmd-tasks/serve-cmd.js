const Task = require('../../tasks/base/task');
const ui = require('../../ui/progress-dots');
const NpmBuildTask = require('../../tasks/build-dev');
const ServeTask = require('../../tasks/serve');

class ServeCmd extends Task {
  run() {
    const npm = new NpmBuildTask({
      ui,
    });

    const serve = new ServeTask({
      ui,
    });

    npm.run().
      then(() => {
        serve.run();
      });
  }
}

module.exports = ServeCmd;
