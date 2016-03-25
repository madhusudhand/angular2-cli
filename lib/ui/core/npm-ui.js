'use strict';

let UiCore = require('./ui-core');

module.exports = UiCore.extend({
  init: function() {

  },
  writeUpdate: function(options) {
    this._super.writeUpdate('installing npm {this.spinner()}');
  }
});
