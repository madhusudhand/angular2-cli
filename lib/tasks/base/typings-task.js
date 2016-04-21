'use strict';

let Task = require('./task');
let typings = require('../../util/typings');
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

    this.typingsInstall();
  },
  typingsInstall: function() {
    return typings(this.command, [], {}, this.options).
      finally(this.finally.bind(this)).
      then(this.announceCompletion.bind(this)).
      fail(this.announceFailure.bind(this));
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
  }
});
