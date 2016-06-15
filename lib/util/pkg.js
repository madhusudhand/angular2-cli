'use strict';

const fs      = require('fs-extra');
const Promise = require('bluebird');

module.exports = {
  read : (path) => {
    const pkg = `${path}/package.json`;
    const read = Promise.promisify(fs.readJson);

    return read(pkg);
  },
  write : (path, data) => {
    const pkg = `${path}/package.json`;
    const write = Promise.promisify(fs.writeJson);

    return write(pkg, data, { spaces: 2 });
  },
};
