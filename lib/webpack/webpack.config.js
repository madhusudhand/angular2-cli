const webpack   = require('webpack');
const path      = require('path');
const devConfig = require('./webpack.dev.config.js');
const prodConfig = require('./webpack.prod.config.js');

const appConfig = require(`${process.cwd()}/src/app-config`);
const appRoot   = './';

function getConfig(env) {
  const envPath   = 'src/environments';

  return {
    // context: __dirname,
    entry : {
      vendor : `./src/${appConfig.app.vendor}`,
      main   : `./src/${appConfig.app.main}`,
    },
    output : {
      path     : `${appRoot}/${appConfig.app.outDir}`,
      filename : '[name].bundle.js',
    },
    module : {
      loaders : [
        // typescript
        {
          test    : /\.ts$/,
          loader  : 'ts',
          exclude : /node_modules/,
        },
      ],
    },
    resolve : {
      extensions : ['', '.ts', '.js'],
    },
    plugins : [
      new webpack.NormalModuleReplacementPlugin(
          // swapp the environment files.
          // See https://webpack.github.io/docs/list-of-plugins.html#normalmodulereplacementplugin
          new RegExp(path.resolve(appRoot, envPath, appConfig.app.environments.source)
                      .replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&')
                    ),
          path.resolve(appRoot, envPath, appConfig.app.environments[env])
        ),
    ],
  };
}

module.exports = (env) => {
  const envConfig = env === 'dev' ? devConfig(env, appConfig) : prodConfig(env, appConfig);
  return Object.assign(getConfig(env), envConfig);
};
