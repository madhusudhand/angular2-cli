'use strict';

let Task = require('./task');
let CleanTask = require('./clean-task');
let npm = require('../../util/npm');
let errorFilter = require('../../util/error-filter');
let objectAssign = require('object-assign');
let Promise = require('promise');

module.exports = Task.extend({
  script: '',
  startProgressMessage: '',
  completionMessage: '',
  errorMessage: '',

  init: function() {
  },
  run: function(options) {
    this.npmOptions = objectAssign({}, options);
    const _this = this;

    const clean = new CleanTask();
    return clean.run().
      then(function() {
        _this.ui.writeSuccess('Clean successful.');
      }).
      catch(function() {
        _this.ui.writeError('Failed to clean directories: [ dist, tmp ]');
      }).
      then(function() {
        return _this.build();
      });

  },
  build: function() {
    try {
      var CopyTask = require('./copy-task');
      var copy = new CopyTask();
    } catch (e) {
      this.ui.writeError(e);
      return Promise.reject(e);
    }

    this.ui.startProgress(this.startProgressMessage);
    let _this = this;

    return copy.run({}).
      then(function() {
        return npm('run', [_this.script], _this.npmOptions).
          finally(_this.finally.bind(_this)).
          then(_this.announceCompletion.bind(_this)).
          fail(_this.annouceFailure.bind(_this));
      }).
      catch(function(err) {
        _this.finally();
        _this.annouceFailure(err);
      });

  },
  announceCompletion: function(result) {
    this.ui.writeSuccess(this.completionMessage);
    let err = errorFilter(result.stdout).join('\n');
    if(err){
      this.ui.writeError(err);
    }
    err = errorFilter(result.stderr).join('\n');
    if(err){
      this.ui.write(err);
    }
  },
  annouceFailure: function(result) {
    this.ui.writeError(this.errorMessage);
    let err = errorFilter(result.stdout).join('\n');
    if(err){
      this.ui.writeError(err);
    }
    err = errorFilter(result.stderr).join('\n');
    if(err){
      this.ui.write(err);
    }
    return Promise.reject(err);
  },
  finally: function() {
    this.ui.stopProgress();
  }
});
