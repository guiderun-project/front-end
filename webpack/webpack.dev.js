const { merge } = require('webpack-merge');
const WebpackBar = require('webpackbar');
const common = require('./webpack.config.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval',
  plugins: [
    new WebpackBar({
      name: 'Loading',
      color: 'blue',
    }),
  ],
  devServer: {
    historyApiFallback: true,
    port: 3000,
    hot: true,
    open: true,
  },
});
