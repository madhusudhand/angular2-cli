'use strict';

var fs = require('fs-extra');
var Promise = require('promise');

module.exports = {
  read: function(path) {
    var pkg = path + '/package.json';
    var read = Promise.denodeify(fs.readJson);

    return read(pkg);
  },
  write: function(path, data) {
    var pkg = path + '/package.json';
    var write = Promise.denodeify(fs.writeJson);

    return write(pkg, data, {spaces: 2});
  }
};
