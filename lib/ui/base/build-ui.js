'use strict';

let Ui = require('./ui');
let colors = require('colors');

module.exports = Ui.extend({
  startProgress: function(message) {
    this._super({
      message: message,
      spinner: 'simpleDots'
    });
  }
});
