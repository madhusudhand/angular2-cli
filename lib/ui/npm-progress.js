'use strict';

let colors = require('colors');

module.exports = function startProgress(message) {
  console.log(colors.green(message));
}
