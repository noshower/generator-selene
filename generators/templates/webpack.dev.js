const { merge } = require('webpack-merge');
const webpack = require('webpack');
const common = require('./webpack.common.js');

module.exports = env => {
  return merge(common(env), {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    output: {
      pathinfo: true,
      filename: '[name].[hash].js',
      publicPath: '/',
    },
    devServer: {
      compress: true,
      hot: true,
      disableHostCheck: true,
      port: 8081,
      open: true,
    },
    plugins: [new webpack.HotModuleReplacementPlugin()],
  });
};
