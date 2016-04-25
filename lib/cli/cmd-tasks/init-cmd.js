const path = require('path');
const typings = require('typings-core');

const Task = require('../../tasks/base/task');
const ui = require('../../ui/progress-dots');
const pkg = require('../../util/pkg');
const NpmInstallTask = require('../../tasks/npm-install');
const TypingsInstallTask = require('../../tasks/typings-install');

class InitCmd extends Task {
  run(options) {
    this.options = Object.assign({}, this.options, options);

    this.npmInstall().
      then(() => typings.install({
        cwd: process.cwd(),
      }));
  }

  npmInstall() {
    const npm = new NpmInstallTask({
      dir: path.resolve('./'),
      ui,
    });

    return pkg.read(npm.dir).
    then((data) => {
      if (data.dependencies.angular2 === '*') {
        npm.new = true;
      }
      return Promise.resolve(npm.run());
    }).
    catch((err) => {
      ui.writeError(err);
    });
  }

  typingsInstall() {
    const typingsTask = new TypingsInstallTask({
      dir: path.resolve('./'),
      ui,
    });

    return typingsTask.run({});
  }
}

module.exports = InitCmd;
