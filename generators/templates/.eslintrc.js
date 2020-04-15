module.exports = {
  parserOptions: {
    sourceType: 'module', // 代码是ECMAScript 模块
    ecmaFeatures: {
      impliedStrict: true, // 启用严格模式
      jsx: true, // 使用jsx
    },
  },
  env: {
    // 一个环境定义了一组预定义的全局变量
    browser: true, // 浏览器环境中的全局变量
    node: true, // Node.js 全局变量和 Node.js 作用域
    jest: true, //  Jest 全局变量
    es6: true, //  启用除了 modules 以外的所有 ECMAScript 6 特性
  },
  /**
   * eslint-config-airbnb 依赖这些插件 eslint-plugin-import, eslint-plugin-react, eslint-plugin-react-hooks, and eslint-plugin-jsx-a11y
   */
  extends: ['airbnb', 'prettier', 'plugin:react/recommended', 'plugin:import/typescript', 'prettier/react', 'plugin:jest/recommended'],
  parser: '@typescript-eslint/parser',
  /**
   * eslint-plugin-babel 可以检查一些尚处于实验性的js语法
   */
  plugins: ['react', 'babel', 'react-hooks', '@typescript-eslint', 'jest'],
  globals: {
    // 全局变量
  },
  root: true, //ESLint自动在要检测的文件目录里寻找配置文件，紧接着是父级目录，一直到文件系统的根目录（除非指定 root: true）
  overrides: [
    //禁用一组文件的配置文件中的规则
    {
      files: ['*.ts', '*.tsx'],
      rules: {},
    },
  ],
  settings: {
    react: {
      version: 'detect', // 让eslint-plugin-react自动检查正在使用的react版本
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        moduleDirectory: ['node_modules', 'src/'],
      },
    },
  },
  rules: {
    // 在这里可以关闭任意 eslint rule
    'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],
    'react/display-name': 0,
  },
};
