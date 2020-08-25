module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['react', 'babel', 'jest', '@typescript-eslint', 'import'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'airbnb',
    'airbnb/hooks',
    'plugin:jest/recommended',
    'plugin:import/typescript',
    'prettier',
    'prettier/react',
  ],
  env: {
    browser: true,
    node: true,
    es6: true,
    jest: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        moduleDirectory: ['node_modules', 'src/'],
      },
    },
  },
  parserOptions: { ecmaVersion: 2020, sourceType: 'module', ecmaFeatures: { impliedStrict: true, jsx: false } },
  globals: {},
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],
  },
};
