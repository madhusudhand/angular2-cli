'use strict';

let path = require('path');

module.exports = function serve() {

  // var npmUi = require('../../ui/core/npm-ui');
  //
  // var npm = new npmUi();
  // npm.write('hello');
  //
  // npm.writeUpdate();
  //
  // setTimeout(function() {
  //   npm.stopUpdate();
  //   console.log('stop update');
  // },5000);

  let npmRunTask = require(path.join(__dirname, '..', '..', 'tasks/npm-run'));
  let npm = new npmRunTask();

  npm.run({}).
    then(null, function() {
      console.log(colors.red('Error!!!'));
    });

};
