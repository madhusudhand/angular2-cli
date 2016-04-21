'use strict';

let Task = require('./task');
let fs = require('fs-extra');
let path = require('path');
let Promise = require('promise');
let globals = require('../../cli/globals');

module.exports = Task.extend({
  init: function() {
    this.buildDir = globals.buildDir;
    this.tempDir = globals.tempDir;
  },
  run: function(options) {

    let remove = Promise.denodeify(fs.remove);
    const dir = path.resolve('./');

    return Promise.all([
      remove(dir + '/' + this.buildDir),
      remove(dir + '/' + this.tempDir)
    ]);
  }
});
