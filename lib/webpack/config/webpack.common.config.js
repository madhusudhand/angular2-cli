'use strict';

const path              = require('path');
const webpack           = require('webpack');
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;
const PugIndexPlugin    = require('../plugins/pug-index-plugin');
const CopyPlugin        = require('copy-webpack-plugin');

const appRoot           = path.resolve('./');
const appConfig         = require(`${appRoot}/src/app-config`);
const envPath           = 'src/environments';
const copy              = require('../../util/copy');

function getConfig(env) {
  return {
    entry : {
      main   : [`${appRoot}/src/${appConfig.app.main}`],
      vendor : [`${appRoot}/src/${appConfig.app.vendor}`],
    },
    output : {
      path              : `${appRoot}/${appConfig.app.buildDir}`,
      filename          : '[name].bundle.js',
      sourceMapFilename : '[name].map',
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
        'awesome-typescript-loader' : require.resolve('awesome-typescript-loader'),
        'raw-loader'                : require.resolve('raw-loader'),
        'style-loader'              : require.resolve('style-loader'),
        'css-loader'                : require.resolve('css-loader'),
        'postcss-loader'            : require.resolve('postcss-loader'),
        'sass-loader'               : require.resolve('sass-loader'),
        'template-loader'           : require.resolve('../loaders/template-loader'),
        'pug-loader'                : require.resolve('../loaders/pug-loader'),
      },
    },
    resolve : {
      extensions : ['', '.ts', '.tsx', '.js'],
    },
    plugins : [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NormalModuleReplacementPlugin(
          // swapp the environment files.
          // See https://webpack.github.io/docs/list-of-plugins.html#normalmodulereplacementplugin
          new RegExp(path.resolve(appRoot, envPath, appConfig.app.environments.source)
                      .replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&')
                    ),
          path.resolve(appRoot, envPath, appConfig.app.environments[env])
        ),
      new ForkCheckerPlugin(),
      new PugIndexPlugin({
        index    : `${appRoot}/src/index.pug`,
        buildDir : `${appConfig.app.buildDir}`,
      }),
      new CopyPlugin([
        // assets
        {
          from : `src/${appConfig.app.assetsDir}`,
          to   : `${appConfig.app.assetsDir}`,
        },
      ].concat(
        // from build-config
        copy.buildConfigFiles()
      ),
        {
          context : `${appRoot}`,
          ignore  : ['.gitkeep', '.gitignore'],
        }),
    ],
  };
}

module.exports = getConfig;
