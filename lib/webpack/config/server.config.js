const path           = require('path');
const appRoot        = path.resolve('./');
const appConfig      = require(`${appRoot}/src/app-config`);

const statOptions = {
  assets       : true,
  colors       : true,
  version      : true,
  timings      : true,
  chunks       : false,
  chunkModules : false,
};

module.exports = {
  host : (appConfig.development && appConfig.development.host) || 'localhost',
  port : (appConfig.development && appConfig.development.port) || 8000,

  devServerOptions : {
    contentBase        : `./${appConfig.app.buildDir}`,
    historyApiFallback : true,
    open               : true,
    stats              : statOptions,
  },
};
