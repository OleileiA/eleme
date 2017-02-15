var path = require('path');
var config = require('../config');

/*ExtractTextPlugin：分离CSS和JS文件*/
/* 使用 extract-text-webpack-plugin就可以把css从js中独立抽离出来 */
var ExtractTextPlugin = require('extract-text-webpack-plugin');

/*暴露出来三个函数。*/

/*_path/static路径*/
/* 静态资源路径，根据生产环境和开发环境分别配置。在这里都是static文件夹 */
exports.assetsPath = function (_path) {
  var assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory;
  /* path.join的拼接路径的兼容性写法 */
  return path.posix.join(assetsSubDirectory, _path)
};

/*cssLoaders 传入options对象*/
/*返回的是cs或less等文件对饮的loader字符串*/
exports.cssLoaders = function (options) {
  options = options || {}
  // generate loader string to be used with extract text plugin
  function generateLoaders (loaders) {
    /*遍历loaders*/
    var sourceLoader = loaders.map(function (loader) {
      var extraParamChar;

      if (/\?/.test(loader)) {
        /*如果穿入的loader数组的一项有问号，就把问好替换成-loader*/
        loader = loader.replace(/\?/, '-loader?');
        extraParamChar = '&'
      } else {
        loader = loader + '-loader'
        extraParamChar = '?'
      }
      return loader + (options.sourceMap ? extraParamChar + 'sourceMap' : '')
    }).join('!');

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract('vue-style-loader', sourceLoader)
    } else {
      return ['vue-style-loader', sourceLoader].join('!')
    }
  }

  // http://vuejs.github.io/vue-loader/en/configurations/extract-css.html
  //loader: ExtractTextPlugin.extract('style', 'css?modules!postcss')
  return {
    css: generateLoaders(['css']),
    postcss: generateLoaders(['css']),
    less: generateLoaders(['css', 'less']),
    sass: generateLoaders(['css', 'sass?indentedSyntax']),
    scss: generateLoaders(['css', 'sass']),
    stylus: generateLoaders(['css', 'stylus']),
    styl: generateLoaders(['css', 'stylus'])
  }
};

// Generate loaders for standalone style files (outside of .vue)
/* 处理vue文件外的css文件 */
exports.styleLoaders = function (options) {
  var output = [];
  var loaders = exports.cssLoaders(options);
  for (var extension in loaders) {
    var loader = loaders[extension];
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      loader: loader
    })
  }
  return output
};
