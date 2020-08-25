var Generator = require('yeoman-generator');

module.exports = class extends Generator {
  writing() {
    this.fs.copyTpl(this.templatePath('src'), this.destinationPath('src'));

    this.fs.copyTpl(this.templatePath('tests'), this.destinationPath('test'));

    this.fs.copyTpl(this.templatePath('.eslintignore'), this.destinationPath('.eslintignore'));

    this.fs.copyTpl(this.templatePath('.eslintrc.js'), this.destinationPath('.eslintrc.js'));

    this.fs.copyTpl(this.templatePath('.prettierignore'), this.destinationPath('.prettierignore'));

    this.fs.copyTpl(this.templatePath('.prettierrc.js'), this.destinationPath('.prettierrc.js'));

    this.fs.copyTpl(this.templatePath('.stylelintignore'), this.destinationPath('.stylelintignore'));

    this.fs.copyTpl(this.templatePath('babel.config.js'), this.destinationPath('babel.config.js'));

    this.fs.copyTpl(this.templatePath('generateScopedName.js'), this.destinationPath('generateScopedName.js'));

    this.fs.copyTpl(this.templatePath('jest.config.js'), this.destinationPath('jest.config.js'));

    this.fs.copyTpl(this.templatePath('package.json'), this.destinationPath('package.json'));

    this.fs.copyTpl(this.templatePath('stylelint.config.js'), this.destinationPath('stylelint.config.js'));

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
