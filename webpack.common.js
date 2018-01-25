const path = require('path');

module.exports = {
  entry:  [
            './src/index.js'
          ],
  output: {
    filename: 'bundle.js',
    path: __dirname
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react'],
          plugins: ['transform-decorators-legacy']
        }
      }
    ]
  },
  node: {
   fs: "empty"
  }
};