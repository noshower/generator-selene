const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const outputPath = path.join(__dirname, './build');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env) => {
  return merge(common(env), {
    mode: 'production',
    devtool: 'source-map',  //
    output: {
      path: outputPath,
      pathinfo: false,
      filename: '[name].[contenthash:8].js',
      publicPath: '/',
    },
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          cache: true, // 缓存路径 node_modules/.cache/uglifyjs-webpack-plugin.
          parallel: true,  // 使用多进程加快构建速度
          sourceMap: true, // cheap-source-map options don't work with this plugin.
          uglifyOptions: {
            warnings: false,
          },
        }),
        new OptimizeCssAssetsPlugin({}), // 压缩css代码
      ],
      usedExports: true, // 移除 JavaScript 上下文中的未引用代码 , 生产环境默认启用
    },
    plugins: [
      // scope hoisting
      // 此插件仅适用于由 webpack 直接处理的 ES6 模块
      new webpack.optimize.ModuleConcatenationPlugin(),
      new MiniCssExtractPlugin({   // 将css代码提取到一个css文件
        filename: '[name].[hash].css',
        chunkFilename: '[id].[hash].css',
      }),
      new BundleAnalyzerPlugin(), // 生成代码分析报告
    ],
  });
};
