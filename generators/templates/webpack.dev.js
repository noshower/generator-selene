// 合并webpack路径
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

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
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
    ],
  });
};
