'use strict';

var Base = require('../util/class-extend');

module.exports = Base.extend({
  init: function() {

  },
  run: function() {
    throw new Error('Task needs to have run() defined.');
  }
});
