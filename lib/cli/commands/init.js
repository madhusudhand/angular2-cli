'use strict';

let path = require('path');
let fsUtil = require('../../util/fs-util');
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
  if ( !fsUtil.dir.touch(dir) ) {
    console.log('Failed!! directory with same name already exists.');
    return null;
  }
  return dir;
}

function blueprintInstall(dir) {
  const source = path.join(__dirname, '..', '..', '..', 'blueprints/ng2/grunt');

  ncp(source, dir, function (err) {
    if (err) {
      console.log('Failed!!' + err);
    } else {
      console.log('Project created !!');
    }
  });
}

function npmInstall(dir) {
  let npmInstallTask = require(path.join(__dirname, '..', '..', 'tasks/npm-install'));
  let npmUi = require(path.join(__dirname, '..', '..', 'ui/npm'));

  let npm = new npmInstallTask();
  npm.dir = dir;
  npm.ui = npmUi;

  npm.run({}).
    then(null, function(err) {
      npmUi.writeError('Failed to install packages via npm.')
    });
}
