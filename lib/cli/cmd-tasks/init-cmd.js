'use strict';

const path           = require('path');
const typings        = require('typings-core');
const Command        = require('./cmd');
const ui             = require('../../ui/progress-dots');
const pkg            = require('../../util/pkg');
const NpmInstall     = require('../../tasks/npm-install');
const TypingsInstall = require('../../tasks/typings-install');

class InitCmd extends Command {
  run(options) {
    this.options = Object.assign({}, this.options, options);

    this.npmInstall().
      then(() => typings.install({
        cwd : process.cwd(),
      }));
  }

  npmInstall() {
    const npm = NpmInstall.new({
      dir : path.resolve('./'),
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
    const typingsTask = TypingsInstall.new({
      dir : path.resolve('./'),
      ui,
    });

    return typingsTask.run({});
  }
}

module.exports = {
  new : (args) => new InitCmd(args),
};
