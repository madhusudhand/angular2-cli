'use strict';

let Task = require('./task');
let npm = require('../util/npm');
let objectAssign = require('object-assign');
let Promise = require('promise');

module.exports = Task.extend({
  // The command to run: can be 'install' or 'uninstall'
  command: '',
  startProgressMessage: '',
  completionMessage: '',

  init: function() {
    const dep = require('../util/dependencies');
    this.dependencies = new dep();
  },
  run: function(options) {
    this.options = {
      dir: this.dir,
      loglevel: 'silent'
    };

    this.ui.startProgress(this.startProgressMessage);

    return Promise.all([this.npmDevelopment(), this.npmProduction()]).
      finally(this.finally.bind(this)).
      then(this.announceCompletion.bind(this));
  },

  npmProduction: function() {
    let npmOptions = objectAssign(this.options, {
      save: true,
      dependencies: this.dependencies.getProd()
    });

    return npm(this.command, npmOptions);
  },

  npmDevelopment: function() {
    let npmOptions = objectAssign(this.options, {
      saveDev: true,
      dependencies: this.dependencies.getDev()
    });

    return npm(this.command, npmOptions);
  },

  announceCompletion: function() {
    this.ui.write('Installation complete.');
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
  }
});
