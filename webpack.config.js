const path = require('path');

module.exports = {
  entry: path.resolve('src'),
  devtool: 'source-maps',
  output: {
    path: path.resolve('dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      use: 'babel-loader'
    }]
  }
};