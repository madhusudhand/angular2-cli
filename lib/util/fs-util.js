
'use strict';

let fs = require('fs-extra');

module.exports = {
  file: {
    touch: touchFile
  },
  dir: {
    touch: touchDir
  }
};


function touchFile(path, obj) {
  return true;
}

function touchDir(path) {
  if ( fs.existsSync(path) ) {
    return false;
  }
  try {
    fs.mkdirSync(path);
  } catch (e) {
    return false;
  }

  return true;
}
