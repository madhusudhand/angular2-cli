'use strict';

let Task = require('./task');
let objectAssign = require('object-assign');
let Promise = require('promise');
let errorFilter = require('../../util/error-filter');
let pkg = require('../../util/pkg');
let typings = require('typings-core');

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

    return this.typingsInstall();
  },
  typingsInstall: function() {
    var _this = this;

    return typings.install({
        cwd: process.cwd()
      }).
      then(function(result) {
        _this.finally();
        return _this.announceCompletion(result);
      }).
      catch(function(result) {
        _this.finally();
        return _this.announceFailure(result);
      });
  },
  announceCompletion: function(result) {
    const err = errorFilter(result.stderr).join('\n');
    if (err){
      this.ui.writeError(this.failureMessage);
      this.ui.write(err);
    } else {
      const timeDiff = (new Date() - this.startTime)/1000;
      this.ui.writeSuccess(this.completionMessage + ' (' + Math.round(timeDiff) + ' sec)');
    }
    return Promise.resolve();
  },
  announceFailure: function(result) {
    this.ui.writeError(this.failureMessage);
    const err = errorFilter(result.stderr).join('\n');
    if (err){
      this.ui.write(err);
    }
    return Promise.reject(err);
  },
  finally: function() {
    this.ui.stopProgress();
  }
});
