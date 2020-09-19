module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-rational-order', 'stylelint-config-prettier'],
  plugins: ['stylelint-order', 'stylelint-declaration-block-no-ignored-properties', 'stylelint-declaration-use-variable'],
  rules: {
    'plugin/declaration-block-no-ignored-properties': true,
    'sh-waqar/declaration-use-variable': [['/color/', '/padding/', '/margin/', { ignoreValues: ['0', 'transparent', 'white', 'black'] }]],
  },
  ignoreFiles: ['/style/color/{bezierEasing,colorPalette,tinyColor}.less'],
};
