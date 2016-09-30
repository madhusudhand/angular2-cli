'use strict';

const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.config.js');
const devConfig    = require('./webpack.dev.config.js');
const prodConfig   = require('./webpack.prod.config.js');
const serverConfig = require('./server.config.js');

function getConfig(options) {
  const configOptions = Object.assign({
    env   : 'dev',
    serve : false,
  }, options);
  let config = configOptions.env === 'dev' ?
               devConfig(configOptions.env) :
               prodConfig(configOptions.env);
  config = webpackMerge(commonConfig(configOptions.env), config);

  if (configOptions.serve) {
    let devServerPath = require.resolve('webpack-dev-server');
    devServerPath = devServerPath.substr(0, devServerPath.indexOf('webpack-dev-server') - 1);
    config.entry.main.unshift(`${devServerPath}/webpack-dev-server/client?http://${serverConfig.host}:${serverConfig.port}/`);
  }
  return config;
}

module.exports = getConfig;
