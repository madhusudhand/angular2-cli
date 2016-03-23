'use strict';

let path = require('path');
let fs = require('fs');
let colors = require('colors');

module.exports = function init(projectName, options) {
  const dir = './' + projectName;

  if ( !fs.existsSync(dir) ) {
    fs.mkdirSync(dir);
    console.log(colors.green('Project created !!'));
  } else {
    console.log(colors.red('Failed!! directory with same name already exists.'));
  }
};
