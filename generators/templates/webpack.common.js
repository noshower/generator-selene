const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const WebpackBar = require('webpackbar');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const webpack = require('webpack');
const generateScopedName = require('./generateScopedName');

const srcPath = path.join(__dirname, './src');
const packageName = require('./package.json').name;

// 匹配svg
const svgRegex = /\.svg(\?v=\d+\.\d+\.\d+)?$/;
const svgOptions = {
  limit: 10000,
  minetype: 'image/svg+xml',
};

// 匹配图片
const imageRegex = /\.(png|jpg|jpeg|gif)(\?v=\d+\.\d+\.\d+)?$/i;
const imageOptions = {
  limit: 10000,
};

module.exports = env => {
  const isEnvProduction = env.production;
  const isEnvDevelopment = env.development;
  return {
    entry: {
      app: path.join(srcPath, './index.tsx'), // 入口文件
    },
    output: {
      // jsonpFunction: `webpackJsonp_${packageName}`,
    },
    module: {
      noParse: /jquery/,
      rules: [
        { parser: { requireEnsure: false } },
        {
          test: /\.(ts|tsx)$/,
          enforce: 'pre',
          include: srcPath,
          loader: 'eslint-loader',
          options: {
            cache: true,
            emitWarning: true,
          },
        },
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                cacheDirectory: true,
              },
            },
          ],
        },
        {
          test: /\.less$/,
          include: srcPath,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: isEnvDevelopment
                  ? {
                      localIdentName: '[name]-[local]-[hash:base64:5]',
                    }
                  : {
                      getLocalIdent: (context, localIdentName, localName) => {
                        return generateScopedName(localName, context.resourcePath);
                      },
                    },
              },
            },
            {
              loader: 'less-loader',
              options: {
                lessOptions: {
                  javascriptEnabled: true,
                },
              },
            },
          ],
        },
        {
          test: /\.css$/,
          include: /node_modules/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: svgRegex,
          loader: 'url-loader',
          options: svgOptions,
        },
        {
          test: imageRegex,
          loader: 'url-loader',
          options: imageOptions,
        },
      ],
    },
    resolve: {
      modules: ['node_modules', path.resolve(__dirname, 'src')],
      extensions: ['.js', '.jsx', '.json', '.tsx', '.ts'],
      plugins: [new TsconfigPathsPlugin({ configFile: './tsconfig.json' })],
    },
    optimization: {
      splitChunks: {
        name: false,
        cacheGroups: {
          vendors: {
            name: 'vendors',
            chunks: 'initial',
            test: /node_modules/,
            priority: 20,
            enforce: true,
          },
        },
      },
    },
    plugins: [
      new CleanWebpackPlugin(),
      new CaseSensitivePathsPlugin(),
      new WebpackBar({
        name: '赤兔掌柜',
        color: '#2f54eb',
      }),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './template.html',
        ...(isEnvProduction
          ? {
              minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
              },
            }
          : undefined),
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(isEnvProduction ? 'production' : 'development'),
      }),
      new ForkTsCheckerWebpackPlugin({
        async: isEnvDevelopment,
      }),
      // new BundleAnalyzerPlugin()
    ],
  };
};
