const config = require('./webpack.config');

const devConfig = Object.assign(config, {
  devtool : 'source-map',
});

module.exports = devConfig;
