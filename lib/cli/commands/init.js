'use strict';

let path = require('path');
let fs = require('fs');
let colors = require('colors');
let ncp = require('ncp').ncp;

module.exports = function init(projectName, options) {
  const dir = path.resolve('./' + projectName);
  const source = path.join(__dirname, '..', '..', '..', 'blueprints/ng2/grunt');

  if ( !fs.existsSync(dir) ) {
    fs.mkdirSync(dir);

    ncp(source, dir, function (err) {
      if (err) {
        console.log(colors.red('Failed!!' + err));
      } else {
        console.log(colors.green('Project created !!'));
      }
    });
  } else {
    console.log(colors.red('Failed!! directory with same name already exists.'));
  }
};
