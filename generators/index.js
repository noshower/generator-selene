var Generator = require('yeoman-generator');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
  }
  async prompting() {
    this.answers = await this.prompt([
      { type: 'input', name: 'appName', message: '请输入应用名称', default: this.appname },
      { type: 'list', name: 'installType', message: '请选择安装依赖的方式', default: 'npm', choices: ['npm', 'yarn'] },
    ]);
  }
  writing() {
    this.fs.copyTpl(this.templatePath(), this.destinationPath());
    this.fs.copyTpl(
      [
        this.templatePath('.eslintignore'),
        this.templatePath('.eslintrc.js'),
        this.templatePath('.gitignore'),
        this.templatePath('.prettierignore'),
        this.templatePath('.prettierrc.js'),
        this.templatePath('.stylelintignore'),
      ],
      this.destinationPath(),
    );
    this.deleteDestination('/package-lock.json');
    this.fs.extendJSON(this.destinationPath('package.json'), {
      name: this.options.appName || this.appname,
    });
  }
  install() {
    if (this.answers.installType === 'npm') {
      this.npmInstall();
    } else {
      this.yarnInstall();
    }
  }
  end() {
    const command = this.answers.installType === 'npm' ? 'npm start' : 'yarn start';
    this.log(`安装完毕，你可以使用 ${command} 启动应用程序`);
  }
};
