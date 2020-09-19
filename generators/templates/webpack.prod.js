const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const outputPath = path.join(__dirname, './build');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const TerserPlugin = require('terser-webpack-plugin');

module.exports = env => {
  return merge(common(env), {
    mode: 'production',
    output: {
      path: outputPath,
      pathinfo: false,
      filename: '[name].[contenthash:8].js',
      publicPath: '/',
    },
    optimization: {
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            ecma: 2020,
            compress: {
              ecma: 5,
            },
            mangle: {
              safari10: true,
            },
            output: {
              ecma: 5,
              comments: false,
              ascii_only: true,
            },
          },
        }),
      ],
      usedExports: true,
    },
    plugins: [
      new webpack.optimize.ModuleConcatenationPlugin(),
      // new BundleAnalyzerPlugin(),
    ],
  });
};
