'use strict';

const fs   = require('fs-extra');
const path = require('path');

function tryCreateDir(dirpath) {
  if (fs.existsSync(dirpath)) {
    return 0;
  }

  try {
    fs.mkdirSync(dirpath);
  } catch (e) {
    return -1;
  }

  return 1;
}

function touchDir(dirpath) {
  const parts = dirpath.split(path.sep);
  for (let i = 1; i < parts.length; i++) {
    const res = tryCreateDir(path.join.apply(null, parts.slice(0, i)));
    if (res < -1) {
      return false;
    }
  }

  return tryCreateDir(path.join.apply(null, parts.slice(0, parts.length)));
}

function touchFile() {
  // no implementation yet
  return true;
}

module.exports = {
  file : {
    touch : touchFile,
  },
  dir : {
    touch : touchDir,
  },
};
