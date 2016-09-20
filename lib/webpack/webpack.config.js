const webpack   = require('webpack');
const path      = require('path');
const devConfig = require('./webpack.dev.config.js');
const prodConfig = require('./webpack.prod.config.js');

const appConfig = require(`${process.cwd()}/src/app-config`);
const appRoot   = './';

function getConfig(env) {
  return {
    // context: __dirname,
    entry : {
      vendor : './src/vendor.ts',
      main   : './src/main.ts',
    },
    output : {
      path     : './dist',
      filename : '[name].bundle.js',
    },
    // devServer: {
    //   contentBase: "./dist",
    //   hot: true,
    //   historyApiFallback: true,
    //   // quiet: true,
    // },
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
          new RegExp(path.resolve(appRoot, 'src/environments', appConfig.app.environments.source)
                      .replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&')
                    ),
          path.resolve(appRoot, 'src/environments', appConfig.app.environments[env])
        ),
    ],
  };
}

module.exports = (env) => {
  const envConfig = env === 'dev' ? devConfig(env) : prodConfig(env);
  return Object.assign(getConfig(env), envConfig);
};
