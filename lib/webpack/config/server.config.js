// const path           = require('path');
// const appRoot        = path.resolve('./');
// const appConfig      = require(`${appRoot}/src/app-config`);

const statOptions = {
  assets       : true,
  colors       : true,
  version      : true,
  timings      : true,
  chunks       : false,
  chunkModules : false,
};

// const port = (appConfig.development && appConfig.development.defaultPort) || 3000;
module.exports = {
  host : 'localhost',
  port : 3000,

  devServerOptions : {
    contentBase        : './dist', // `./${appConfig.app.outDir}`,
    historyApiFallback : true,
    open               : true,
    stats              : statOptions,
  },
};
