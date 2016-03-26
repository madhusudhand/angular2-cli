'use strict';

var Base = require('./class-extend');
let path = require('path');

module.exports = Base.extend({
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
