'use strict';

let Task = require('./task');
let fs = require('fs-extra');
let path = require('path');
let Promise = require('promise');
let globals = require('../../cli/globals');

module.exports = Task.extend({
  init: function() {
    this.copy = Promise.denodeify(this.cp);
  },
  run: function(options) {
    let _this = this;
    return _this.copyAngular().
      then(function() {
        return _this.copyAssets();
      });
  },
  copyAngular: function() {
    const dest = globals.buildDir + '/' + globals.vendorDir + '/';
    let files = [];
    for (let file of globals.libraries.angular) {
      files.push({src: 'node_modules/' + file, dest: dest + file});
    }

    return this.copy(files);
  },
  copyAssets: function() {
    const file = [{
      src: globals.sourceDir + '/' + globals.assetsDir,
      dest: globals.buildDir + '/' + globals.assetsDir
    }];

    return this.copy(file);
  },
  copyThirdparty: function() {

  },
  cp: function(files, callback) {
    if (!Array.isArray(files)) {
      callback('error');
    }
    for(let file of files) {
      fs.copy(file.src, file.dest);
    }
    callback();
  },
});
