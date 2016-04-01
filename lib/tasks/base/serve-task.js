'use strict';

let Task = require('./task');
let npm = require('../../util/npm');
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
    if(result.stderr)
      this.ui.write(result.stderr);
  },
  annouceFailure: function(result) {
    this.ui.writeError(this.errorMessage);
    if(result.stderr)
      this.ui.write(result.stderr);
  },
  writeProgress: function(result) {
    result.stderr.on('data', function(data) {
      this.ui.write(data);
    })
  }
});
