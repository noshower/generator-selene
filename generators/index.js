var Generator = require('yeoman-generator');

module.exports = class extends Generator {
  writing() {
    this.fs.copyTpl(this.templatePath('src/pages/home.less'), this.destinationPath('src/pages/home.less'));

    this.fs.copyTpl(this.templatePath('src/pages/home.tsx'), this.destinationPath('src/pages/home.tsx'));

    this.fs.copyTpl(this.templatePath('src/index.tsx'), this.destinationPath('src/index.tsx'));

    this.fs.copyTpl(this.templatePath('.babelrc'), this.destinationPath('.babelrc'));

    this.fs.copyTpl(this.templatePath('.eslintignore'), this.destinationPath('.eslintignore'));

    this.fs.copyTpl(this.templatePath('.eslintrc.js'), this.destinationPath('.eslintrc.js'));

    this.fs.copyTpl(this.templatePath('.gitignore'), this.destinationPath('.gitignore'));

    this.fs.copyTpl(this.templatePath('.prettierrc'), this.destinationPath('.prettierrc'));

    this.fs.copyTpl(this.templatePath('.stylelintrc.json'), this.destinationPath('.stylelintrc.json'));

    this.fs.copyTpl(this.templatePath('package.json'), this.destinationPath('package.json'));

    this.fs.copyTpl(this.templatePath('template.html'), this.destinationPath('template.html'));

    this.fs.copyTpl(this.templatePath('tsconfig.json'), this.destinationPath('tsconfig.json'));

    this.fs.copyTpl(this.templatePath('webpack.common.js'), this.destinationPath('webpack.common.js'));

    this.fs.copyTpl(this.templatePath('webpack.dev.js'), this.destinationPath('webpack.dev.js'));

    this.fs.copyTpl(this.templatePath('webpack.prod.js'), this.destinationPath('webpack.prod.js'));
  }
  install() {
    this.npmInstall();
  }
};
