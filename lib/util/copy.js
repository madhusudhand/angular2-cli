const path        = require('path');
const appRoot     = path.resolve('./');
const buildConfig = require(`${appRoot}/build-config`);

function buildConfigFiles() {
  return !buildConfig
      || !buildConfig.copyFiles
      || buildConfig.copyFiles.map((file) => {
        if (typeof file === 'string') {
          return { from: file };
        }
        return file;
      });
}

module.exports = {
  buildConfigFiles,
};
