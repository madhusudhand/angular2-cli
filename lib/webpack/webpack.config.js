'use strict';

const path      = require('path');
const webpack   = require('webpack');
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;
const PugPlugin = require('./pug-plugin');

const devConfig = require('./webpack.dev.config.js');
const prodConfig = require('./webpack.prod.config.js');

const appRoot   = path.resolve('./');
const appConfig = require(`${appRoot}/src/app-config`);

function getConfig(env) {
  const envPath   = 'src/environments';

  return {
    // context: __dirname,
    bail  : true,
    entry : {
      vendor : `${appRoot}/src/${appConfig.app.vendor}`,
      main   : `${appRoot}/src/${appConfig.app.main}`,
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
          loaders : [
            {
              loader : 'awesome-typescript-loader',
              query  : {
                tsconfig : `${appRoot}/src/tsconfig.json`,
              },
            },
            {
              loader : 'template-loader',
              query  : {
                rootPath : appRoot,
              },
            },
          ],
          exclude : [/\.(spec|e2e)\.ts$/],
        },
        // pug
        {
          test   : /\.pug$/,
          loader : 'pug-loader',
        },
        // sass
        {
          test    : /\.scss$|\.sass$/,
          loaders : ['raw-loader', 'sass-loader'], // 'css-loader', 'postcss-loader',
        },
        // html, css
        {
          test   : /\.(html|css)$/,
          loader : 'raw-loader',
        },
      ],
    },
    resolveLoader : {
      alias : {
        // 'awesome-typescript-loader' : require.resolve('awesome-typescript-loader'),
        'raw-loader'      : require.resolve('raw-loader'),
        'style-loader'    : require.resolve('style-loader'),
        'css-loader'      : require.resolve('css-loader'),
        'postcss-loader'  : require.resolve('postcss-loader'),
        'sass-loader'     : require.resolve('sass-loader'),
        'template-loader' : require.resolve('./template-loader'),
        'pug-loader'      : require.resolve('./pug-loader'),
      },
    },
    resolve : {
      extensions : ['', '.ts', '.tsx', '.js'],
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
      new ForkCheckerPlugin(),
      new PugPlugin({
        index  : `${appRoot}/src/index.pug`,
        outDir : `${appConfig.app.outDir}`,
      }),
    ],
  };
}

module.exports = (env) => {
  const envConfig = env === 'dev' ? devConfig(env, appConfig) : prodConfig(env, appConfig);
  return Object.assign(getConfig(env), envConfig);
};
