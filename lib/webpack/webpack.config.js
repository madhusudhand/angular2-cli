module.exports = {
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
};
