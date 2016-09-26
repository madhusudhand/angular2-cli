module.exports = (env, appConfig) => {
  const devConfig = {
    devtool   : 'source-map',
    devServer : {
      contentBase        : appConfig.app.outDir,
      hot                : true,
      historyApiFallback : true,
      // quiet: true,
    },
  };

  return devConfig;
};
