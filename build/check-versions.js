/*semver解析版本号的辅助模块 https://www.npmjs.com/package/semver*/
var semver = require('semver');
/*chalk模块 使命令行的输入样式，个性化。*/
var chalk = require('chalk');
/* 引入了 npm init 的配置文件 package.json*/
var packageConfig = require('../package.json');

/*定义exec方法，引入 子进程 模块，新开一个进程把传入的cmd处理并且返回*/
var exec = function (cmd) {
  return require('child_process')
    .execSync(cmd).toString().trim()
};
/*定义了一个数组，两个对象分别对应着node 和npm 的当前版本和项目的版本需求*/
var versionRequirements = [
  {
    name: 'node',
    /*semver.clean('  =v1.2.3   ') // '1.2.3'*/
    currentVersion: semver.clean(process.version),
    versionRequirement: packageConfig.engines.node
  },
  {
    name: 'npm',
    currentVersion: exec('npm --version'),
    versionRequirement: packageConfig.engines.npm
  }
];

/*check-versions.js 暴露出以下东西：*/
module.exports = function () {
  var warnings = [];
  for (var i = 0; i < versionRequirements.length; i++) {
    var mod = versionRequirements[i];
    console.log(mod.currentVersion);
    /*semver.satisfies('1.2.3', '1.x || >=2.5.0 || 5.0.0 - 7.2.3') // true*/
    /*如果当前版本不满足require版本就把关于模块版本的警告语句push到warings数组中。*/
    if (!semver.satisfies(mod.currentVersion, mod.versionRequirement)) {
      warnings.push(mod.name + ': ' +
        chalk.red(mod.currentVersion) + ' should be ' +
        chalk.green(mod.versionRequirement)
      )
    }
  }

  if (warnings.length) {
    console.log('');
    console.log(chalk.yellow('To use this template, you must update following to modules:'))
    console.log();
    for (var i = 0; i < warnings.length; i++) {
      var warning = warnings[i];
      console.log('  ' + warning)
    }
    console.log();
    process.exit(1)
  }
};
