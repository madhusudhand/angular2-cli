const path      = require('path');
const webpack   = require('webpack');
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;

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
        // {
        //   test   : /\.css$/,
        //   loader : 'style!css',
        // },
        // {
        //   test   : /\.(html|css)$/,
        //   loader : 'raw-loader',
        // },
      ],
    },
    resolveLoader : {
      alias : {
        // 'awesome-typescript-loader' : require.resolve('awesome-typescript-loader'),
        'template-loader' : require.resolve('./template-loader'),
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
    ],
  };
}

module.exports = (env) => {
  const envConfig = env === 'dev' ? devConfig(env, appConfig) : prodConfig(env, appConfig);
  return Object.assign(getConfig(env), envConfig);
};
