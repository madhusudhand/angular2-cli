const fs = require('fs-extra');
const Promise = require('promise');

module.exports = {
  read: (path) => {
    const pkg = `${path}/package.json`;
    const read = Promise.denodeify(fs.readJson);

    return read(pkg);
  },
  write: (path, data) => {
    const pkg = `${path}/package.json`;
    const write = Promise.denodeify(fs.writeJson);

    return write(pkg, data, { spaces: 2 });
  },
};
