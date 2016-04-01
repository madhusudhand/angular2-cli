'use strict';

module.exports = function test() {

  var npmUi = require('../../ui/core/npm-ui');

  var npm = new npmUi();
  npm.write('hello');

  npm.writeUpdate();

  setTimeout(function() {
    npm.stopUpdate();
    console.log('stop update');
  },5000);

};