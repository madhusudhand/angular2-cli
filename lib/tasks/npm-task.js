'use strict';

let Task = require('./task');
let npm = require('../util/npm');
let objectAssign = require('object-assign');
let Promise = require('promise');

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      console.log(milliseconds + ' ms');
      break;
    }
  }
}

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
    let _this = this;

    _this.options = {
      dir: _this.dir,
      loglevel: 'silent'
    };

    // do not log during installation
    // this.disableLogger();

    return Promise.all([_this.npmDevelopment(), _this.npmProduction()]).
      finally(_this.finally.bind(_this)).
      then(_this.announceCompletion.bind(_this));
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
    console.log('Installation complete.');
  },

  finally: function() {
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
