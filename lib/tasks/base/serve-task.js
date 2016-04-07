'use strict';

let Task = require('./task');
let npm = require('../../util/npm');
let errorFilter = require('../../util/error-filter');
let objectAssign = require('object-assign');
let Promise = require('promise');

module.exports = Task.extend({
  script: '',
  startMessage: '',
  errorMessage: '',

  init: function() {
  },
  run: function(options) {
    let npmOptions = objectAssign({}, options);

    this.ui.write(this.startMessage);

    return npm('run', [this.script], npmOptions).
      progress(this.writeProgress.bind(this)).
      then(this.announceCompletion.bind(this));
      fail(this.annouceFailure.bind(this));
  },
  announceCompletion: function(result) {
    this.ui.writeSuccess(this.completionMessage);
    const err = errorFilter(result.stderr).join('\n');
    if(err){
      this.ui.write(err);
    }
  },
  annouceFailure: function(result) {
    this.ui.writeError(this.errorMessage);
    const err = errorFilter(result.stderr).join('\n');
    if(err){
      this.ui.write(err);
    }
    return Promise.reject(err);
  },
  writeProgress: function(result) {
    const _this = this;
    result.stdout.on('data', function(data) {
      const err = errorFilter(data).join('\n');
      if(err){
        _this.ui.writeError(err);
      }
    });

    result.stderr.on('data', function(data) {
      const err = errorFilter(data).join('\n');
      if(err){
        _this.ui.writeError(err);
      }
    });
  }
});
