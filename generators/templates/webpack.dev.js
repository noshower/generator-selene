// 合并webpack路径
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

module.exports = (env) => {
  return merge(common(env), {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    output: {
      pathinfo: false,
      filename: '[name].[hash].js',
      publicPath: '/',
    },
    devServer: {
      compress: true,
      hot: true,
      port: 8080,
      open: true,
    },
    plugins: [
      // 启用热替换模块(Hot Module Replacement)
      new webpack.HotModuleReplacementPlugin(),
      // 严格区分路径大小写，避免在不同操作系统下因为路径大小写问题而导致应用编译出错
      new CaseSensitivePathsPlugin(),
    ],
  });
};
