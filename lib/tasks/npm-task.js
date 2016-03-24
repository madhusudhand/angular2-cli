'use strict';

let Task = require('./task');
let npm = require('../util/npm');
let extend = require('../util/object-extend');
// let Promise = require('promise');


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
      'prefix': this.appPath
    };

    // do not log during installation
    // this.disableLogger();

    return this.npmProduction().
      finally(this.finally.bind(this)).
      then(this.announceCompletion.bind(this));

  },

  npmProduction: function() {
    let npmOptions = extend(this.options, {
      save: true
    });
    const packages = this.dependencies.getProd();

    return npm(this.command, packages, npmOptions);
  },

  npmDevelopment: function() {
    let npmOptions = extend(this.options, {
      'save-dev': true
    });
    const packages = this.dependencies.getDev();

    return npm(this.command, packages, npmOptions);
  },

  announceCompletion: function() {
    console.log('installation completed');
  },

  finally: function() {
    console.log('finally called');
    // this.ui.stopProgress();
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
