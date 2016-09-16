const loaders = [
  {
    test: /\.ts$/,
    loader: 'ts',
    exclude: /node_modules/
  }
];

module.exports = {
  // context: __dirname,
  // devtool: debug ? 'source-map' : null,
  entry: './src/main.ts',
  output: {
    path: './dist',
    filename: 'bundle.js'
  },
  module: {
    loaders: loaders
  },
  resolve: {
    extensions: ['', '.ts', '.js']
  }
};
