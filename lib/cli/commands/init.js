'use strict';

let path = require('path');
let fs = require('fs');
let colors = require('colors');
let ncp = require('ncp').ncp;

module.exports = function init(projectName, options) {
  const dir = createDir(projectName);
  if (dir !== null) {
    blueprintInstall(dir);
    npmInstall(dir);
  }
};


function createDir(projectName) {
  const dir = path.resolve('./' + projectName);

  if ( fs.existsSync(dir) ) {
    console.log(colors.red('Failed!! directory with same name already exists.'));
    return null;
  }

  fs.mkdirSync(dir);

  return dir;
}

function blueprintInstall(dir) {
  const source = path.join(__dirname, '..', '..', '..', 'blueprints/ng2/grunt');
  ncp(source, dir, function (err) {
    if (err) {
      console.log(colors.red('Failed!!' + err));
    } else {
      console.log(colors.green('Project created !!'));
    }
  });
}

function npmInstall(dir) {
  let npmInstallTask = require(path.join(__dirname, '..', '..', 'tasks/npm-install'));
  let npm = new npmInstallTask();
  npm.dir = dir;

  npm.run({}).
    then(function() {
      console.log('init promise call');
    });
}
