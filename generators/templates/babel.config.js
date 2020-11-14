module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: ['last 2 versions', '> 1%', 'ie >= 9'],
        },
        useBuiltIns: 'usage',
        corejs: { version: 3, proposals: true },
        modules: false,
        exclude: ['transform-typeof-symbol'],
      },
    ],
    [
      '@babel/preset-react',
      {
        useBuiltIns: true,
        runtime: 'automatic',
      },
    ],
    [
      '@babel/preset-typescript',
      {
        onlyRemoveTypeImports: true,
      },
    ],
  ],
  plugins: [
    [
      '@babel/plugin-proposal-decorators',
      {
        legacy: true,
      },
    ],
    [
      '@babel/plugin-proposal-class-properties',
      {
        loose: true,
      },
    ],

    '@babel/plugin-proposal-numeric-separator',
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: 'css',
      },
    ],
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: false,
        useESModules: true,
        version: require('@babel/runtime/package.json').version,
        regenerator: true,
      },
    ],
  ],
};
