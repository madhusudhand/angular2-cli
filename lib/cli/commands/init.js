'use strict';

const typings    = require('typings-core');
const Command    = require('./command');
const ui         = require('../../ui/progress-dots');
const NpmInstall = require('../../tasks/npm-install');

class InitCmd extends Command {
  run(options) {
    const _this = this;
    this.options = Object.assign({}, this.options, options);

    _this.validate().
      then(_this.npmInstall.bind(_this)).
      then(() => typings.install({
        cwd : process.cwd(),
      }));
  }

  npmInstall(data) {
    const npm = NpmInstall.new({
      dir : this.appDir,
      ui,
      new : (data.dependencies['@angular/core'] === '*'),
    });

    return Promise.resolve(npm.run());
  }
}

module.exports = function init(appName, options) {
  const cmd = new InitCmd();
  cmd.run(Object.assign({}, options, {
    appName,
  }));
};
