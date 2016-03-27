'use strict';

let Task = require('./task');
let Promise = require('promise');
let path = require('path');
let fs = require('fs-extra');

module.exports = Task.extend({
  flavor: '',
  startProgressMessage: '',
  completionMessage: '',

  init: function() {
  },
  run: function(options) {

    this.ui.startProgress(this.startProgressMessage);

    var copy = Promise.denodeify(fs.copy);
    const source = path.join(__dirname, '..', '..', '..', 'blueprints/ng2', this.flavor);
    return copy(source, options.dir).
      finally(this.finally.bind(this)).
      then(this.announceCompletion.bind(this));
  },
  finally: function() {
    this.ui.stopProgress();
  },
  announceCompletion: function() {
    this.ui.writeSuccess(this.completionMessage);
  },
});
