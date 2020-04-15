const path = require('path');
const HappyPack = require('happypack');
const happyThreadPool = HappyPack.ThreadPool({ size: 4 });
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpack = require('webpack');
const srcPath = path.join(__dirname, './src');

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

module.exports = (env) => {
  const isEnvProduction = env.production;
  const isEnvDevelopment = env.development;
  return {
    entry: {
      app: path.join(srcPath, './index.tsx'), // 入口文件
    },
    module: {
      rules: [
        { parser: { requireEnsure: false } }, // 禁用 require.ensure， 默认就是false
        {
          test: /\.(js|jsx|ts|tsx)$/,
          enforce: 'pre', // 这里表示eslint在babel-loader编译前使用
          exclude: /node_modules/,
          loader: 'eslint-loader',
          options: {
            cache: true, // 开启缓存后，缓存会被写入./node_modules/.cache/eslint-loader目录
          },
        },
        {
          test: /\.(js|jsx|ts|tsx)$/,
          exclude: /node_modules/,
          loaders: [
            {
              loader: 'babel-loader',
              options: {
                // 默认缓存在node_modules/.cache/babel-loade中
                // 使用cache-loader+ babel-loader 慢于 babel-loader + cacheDirectory
                cacheDirectory: true,
              },
            },
          ],
        },
        {
          test: /\.less$/,
          include: srcPath,
          use: [
            // 生产环境将css提取到一个单独文件，这样可以异步加载，浏览器可以更快解析css
            isEnvDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                modules: {
                  localIdentName: '[name]-[local]-[hash:base64:5]',
                },
              },
            },
            {
              loader: 'less-loader',
            },
          ],
        },
        {
          test: /\.css$/,
          include: /node_modules/, // 为了引入antd css
          use: [isEnvDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader'],
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
      extensions: ['.js', '.jsx', '.json', '.tsx', '.ts'],
      alias: {
        '@': path.join(srcPath, './'),
        components: path.join(srcPath, './components'),
        pages: path.join(srcPath, './pages'),
        service: path.join(srcPath, './service'),
        util: path.join(srcPath, './util'),
        images: path.join(srcPath, './images'),
        vo: path.join(srcPath, './vo'),
      },
    },
    optimization: {
      splitChunks: {
        name: false,
        cacheGroups: {
          // 将所有第三方模块打包到一起
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
      // 清除之前打包的文件
      new CleanWebpackPlugin(),
      // 去掉moment的所有locale files文件，减少打包后的文件
      // https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      // happypack vs thread-loader 哪个更快
      // new HappyPack({
      //   id: 'ts',
      //   threadPool: happyThreadPool,
      //   loaders: [
      //     {
      //       loader: 'babel-loader',
      //       options: {
      //         cacheDirectory: true,
      //       },
      //     },
      //   ],
      // }),
      new HtmlWebpackPlugin(
        Object.assign(
          {},
          {
            filename: 'index.html',
            template: './template.html',
          },
          isEnvProduction
            ? {
                minify: {
                  // 生产环境使用html-minifier-terser 压缩HTML
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
            : undefined,
        ),
      ),
      new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('production') }),
      // new BundleAnalyzerPlugin()
    ],
  };
};
