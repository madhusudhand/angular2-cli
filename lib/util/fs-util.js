'use strict';

const fs = require('fs-extra');

function touchFile() {
  // no implementation yet
  return true;
}

function touchDir(path) {
  if (fs.existsSync(path)) {
    return false;
  }
  try {
    fs.mkdirSync(path);
  } catch (e) {
    return false;
  }

  return true;
}

module.exports = {
  file: {
    touch: touchFile,
  },
  dir: {
    touch: touchDir,
  },
};
