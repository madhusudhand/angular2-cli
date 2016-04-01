'use strict';

let Task = require('./task');
let npm = require('../../util/npm');
let objectAssign = require('object-assign');
let Promise = require('promise');

module.exports = Task.extend({
  // The command to run: can be 'install' or 'uninstall'
  command: '',
  startProgressMessage: '',
  completionMessage: '',

  init: function() {
    const dep = require('../../util/dependencies');
    this.dependencies = new dep();
    this.errors = '';
  },
  run: function(options) {
    this.options = {
      dir: this.dir
    };

    this.ui.startProgress(this.startProgressMessage);
    // this.disableLogger();

    return Promise.all([
      this.npmDevelopment().then(this.errorLog.bind(this)),
      this.npmProduction().then(this.errorLog.bind(this))
    ]).
    finally(this.finally.bind(this)).
    then(this.announceCompletion.bind(this));
  },
  npmProduction: function() {
    let npmOptions = objectAssign({}, {
      save: true
    });
    let dependencies = this.dependencies.getProd();

    return npm(this.command, dependencies, npmOptions, this.options);
  },
  npmDevelopment: function() {
    let npmOptions = objectAssign({}, {
      'save-dev': true
    });
    let dependencies = this.dependencies.getDev();

    return npm(this.command, dependencies, npmOptions, this.options);
  },
  announceCompletion: function(result) {
    this.ui.writeSuccess(this.completionMessage);

    this.ui.write(this.errors);
  },
  finally: function() {
    this.ui.stopProgress();
    // this.restoreLogger();
  },
  disableLogger: function() {
    this.oldLog = console.log;
    console.log = function() {};
  },
  restoreLogger: function() {
    console.log = this.oldLog;
  },
  errorLog: function(result) {
    this.errors += result.stderr;
  }
});
