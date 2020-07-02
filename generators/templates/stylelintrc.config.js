module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-rational-order', 'stylelint-config-prettier'],
  plugins: ['stylelint-order', 'stylelint-declaration-block-no-ignored-properties', 'stylelint-declaration-use-variable'],
  rules: {
    'plugin/declaration-block-no-ignored-properties': true, // 开启 declaration-block-no-ignored-properties 规则
    'sh-waqar/declaration-use-variable': [['/color/', 'padding', 'margin']], // 限制/color/ , z-index, font-size 使用less/css变量
  },
  ignoreFiles: ['/style/color/{bezierEasing,colorPalette,tinyColor}.less'],
};
