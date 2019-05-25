const path = require('path');

module.exports = {
  entry: {
    background: path.join(__dirname, 'extension/src/scripts/background.ts'),
    'content-script': path.join(__dirname, 'extension/src/scripts/content-script.ts'),
  },
  output: {
    path: path.join(__dirname, 'extension/dist'),
    filename: '[name].js',
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      }
    ]
  },
  mode: 'none',
  resolve: {
    extensions: [ '.ts', '.js' ],
  },
};