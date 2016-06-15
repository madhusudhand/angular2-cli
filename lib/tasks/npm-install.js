/* eslint-disable no-param-reassign */

'use strict';

const Promise = require('bluebird');
const Task    = require('./task');
const npm     = require('../util/npm');
const logger  = require('../ui/logger');
const pkg     = require('../util/pkg');

class NpmInstall extends Task {
  constructor(args) {
    super(Object.assign({
      errors               : '',
      command              : 'install',
      startProgressMessage : 'Installing npm packages',
      completionMessage    : 'Installed npm packages.',
      failureMessage       : 'Failed to install few npm packages.',
    }, args));
  }

  run() {
    this.options = {
      dir : this.dir,
    };

    this.startTime = new Date();
    this.ui.startProgress(this.startProgressMessage);

    if (this.new) {
      return this.npmNewInstall();
    }
    return this.npmInstall();
  }

  npmInstall() {
    return Promise.resolve(
      npm(this.command, [], {}, this.options).
      then(this.errorLog.bind(this))
    ).
    finally(this.finally.bind(this)).
    then(this.announceCompletion.bind(this)).
    catch(this.announceFailure.bind(this));
  }

  npmNewInstall() {
    this.command = 'update';

    return Promise.all([
      this.npmDevelopment().then(this.errorLog.bind(this)),
      this.npmProduction().then(this.errorLog.bind(this)),
    ]).
    finally(this.finally.bind(this)).
    then(this.announceCompletion.bind(this)).
    catch(this.announceFailure.bind(this));
  }

  npmProduction() {
    const npmOptions = Object.assign({}, {
      save : true,
    });

    return npm(this.command, [], npmOptions, this.options);
  }

  npmDevelopment() {
    const npmOptions = Object.assign({}, {
      'save-dev'    : true,
      'no-optional' : true,
    });

    return npm(this.command, [], npmOptions, this.options);
  }

  announceCompletion() {
    const err = logger._filter(this.errors).join('\n');
    if (err) {
      this.ui.writeError(this.failureMessage);
      this.ui.writeInfo(err);
    } else {
      const timeDiff = (new Date() - this.startTime) / 1000;
      this.ui.writeSuccess(`${this.completionMessage} (${Math.round(timeDiff)} sec)`);
    }

    const _this = this;
    return pkg.read(_this.dir, 'utf8').
    then((data) => {
      // angular2(beta) works with specific versions of peer dependencies
      if (data.dependencies['reflect-metadata']) {
        data.dependencies['reflect-metadata'] = data.dependencies['reflect-metadata']
                                                  .replace('^', '');
      }
      if (data.dependencies.rxjs) {
        data.dependencies.rxjs = data.dependencies.rxjs.replace('^', '');
      }

      return pkg.write(_this.dir, data);
    }).
    catch((e) => {
      _this.ui.writeError(e);
    });
  }

  announceFailure(result) {
    this.ui.writeError(this.failureMessage);
    logger.logErrors(result.stderr);
  }

  finally() {
    this.ui.stopProgress();
  }

  errorLog(result) {
    this.errors += result.stderr;
  }
}

module.exports = {
  new : (args) => new NpmInstall(args),
};
