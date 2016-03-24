'use strict';

let Util = require('./util');
let path = require('path');

module.exports = Util.extend({
  init: function() {
    const d = path.join('..', 'cli', 'dependencies.json');
    this.packages = require(d);
  },
  getDev: function() {
    return this.packages.dev;
  },
  getProd: function() {
    return this.packages.prod;
  }
});
