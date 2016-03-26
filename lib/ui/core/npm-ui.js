'use strict';

let UiCore = require('./ui-core');
let colors = require('colors');

module.exports = UiCore.extend({
  init: function() {

  },
  startProgress: function(message) {
    this._super.startProgress({
      message: colors.green(message),
      spinner: 'simpleDots'
    });
  }
});
