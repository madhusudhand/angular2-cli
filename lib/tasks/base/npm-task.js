'use strict';

let Task = require('./task');
let npm = require('../../util/npm');
let objectAssign = require('object-assign');
let Promise = require('promise');
let errorFilter = require('../../util/error-filter');
let pkg = require('../../util/pkg');

module.exports = Task.extend({
  // The command to run: can be 'install' or 'uninstall'
  command: '',
  startProgressMessage: '',
  completionMessage: '',

  init: function() {
    this.errors = '';
  },
  run: function(options) {
    this.options = {
      dir: this.dir
    };

    this.startTime = new Date();
    this.ui.startProgress(this.startProgressMessage);

    if (this.new) {
      return this.npmNewInstall();
    } else {
      return this.npmInstall();
    }
  },
  npmInstall: function() {
    return Promise.resolve(
      npm(this.command, [], {}, this.options).
      then(this.errorLog.bind(this))
    ).
    finally(this.finally.bind(this)).
    then(this.announceCompletion.bind(this)).
    catch(this.announceFailure.bind(this));
  },
  npmNewInstall: function() {
    this.command = 'update';

    return Promise.all([
      this.npmDevelopment().then(this.errorLog.bind(this)),
      this.npmProduction().then(this.errorLog.bind(this))
    ]).
    finally(this.finally.bind(this)).
    then(this.announceCompletion.bind(this)).
    catch(this.announceFailure.bind(this));

  },
  npmProduction: function() {
    let npmOptions = objectAssign({}, {
      save: true
    });

    return npm(this.command, [], npmOptions, this.options);
  },
  npmDevelopment: function() {
    let npmOptions = objectAssign({}, {
      'save-dev': true,
      'no-optional': true
    });

    return npm(this.command, [], npmOptions, this.options);
  },
  announceCompletion: function(result) {
    const err = errorFilter(this.errors).join('\n');
    if (err){
      this.ui.writeError(this.failureMessage);
      this.ui.write(err);
    } else {
      const timeDiff = (new Date() - this.startTime)/1000;
      this.ui.writeSuccess(this.completionMessage + ' (' + Math.round(timeDiff) + ' sec)');
    }

    const _this = this;
    return pkg.read(_this.dir, 'utf8').
    then(function(data) {
      // angular2(beta) works with specific versions of peer dependencies
      if (data.dependencies['reflect-metadata'])
        data.dependencies['reflect-metadata'] = data.dependencies['reflect-metadata'].replace('^', '');
      if (data.dependencies['rxjs'])
        data.dependencies['rxjs'] = data.dependencies['rxjs'].replace('^', '');

      return pkg.write(_this.dir, data);
    }).
    catch(function(err) {
      _this.ui.writeError(err);
    });
  },
  announceFailure: function(result) {
    this.ui.writeError(this.failureMessage);
    const err = errorFilter(result.stderr).join('\n');
    if (err){
      this.ui.write(err);
    }
  },
  finally: function() {
    this.ui.stopProgress();
  },
  errorLog: function(result) {
    this.errors += result.stderr;
  }
});
