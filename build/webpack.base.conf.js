var path = require('path');
var config = require('../config');
var utils = require('./utils');

//利用path的resolve方法获得项目的根目录路径。
var projectRoot = path.resolve(__dirname, '../');

var env = process.env.NODE_ENV;
// check env & config/index.js to decide whether to enable CSS source maps for the
// various preprocessor loaders added to vue-loader at the end of this file
var cssSourceMapDev = (env === 'development' && config.dev.cssSourceMap);
var cssSourceMapProd = (env === 'production' && config.build.productionSourceMap);
var useCssSourceMap = cssSourceMapDev || cssSourceMapProd;

module.exports = {
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
		//publicPath静态资源(例如图片之类的)引入路径。(都设置为根目录了。)
    publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
		//这里的name取决于entry(入口)的名字
    filename: '[name].js'
  },
  resolve: {
		//extensions:表示引入模块的时候自动补全
    extensions: ['', '.js', '.vue', '.json'],
		//fallback表示当我们前端引入的模块找不到的时候，就去node_modules中去找。
    fallback: [path.join(__dirname, '../node_modules')],
		//路径的别名，方便我们输入路径的时候简化字符串。
    alias: {
      'vue$': 'vue/dist/vue.common.js',
      'src': path.resolve(__dirname, '../src'),
      'assets': path.resolve(__dirname, '../src/assets'),
      'components': path.resolve(__dirname, '../src/components')
    }
  },
  resolveLoader: {
    fallback: [path.join(__dirname, '../node_modules')]
  },
  module: {
		//利用eslint对文件预处理，预加载。
    preLoaders: [
      {
        test: /\.vue$/,
        loader: 'eslint',
        include: [
          path.join(projectRoot, 'src')
        ],
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loader: 'eslint',
        include: [
          path.join(projectRoot, 'src')
        ],
        exclude: /node_modules/
      }
    ],
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        include: [
          path.join(projectRoot, 'src')
        ],
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
				//对图片文件处理
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url',
				//如果小于10KB就直接编译到JS文件中，如果大于10KB就输出到static文件下
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
	//eslint语法提示信息。
  eslint: {
    formatter: require('eslint-friendly-formatter')
  },
  vue: {
    /*对vue中css的各种标进行loader*/
    loaders: utils.cssLoaders({ sourceMap: useCssSourceMap }),
    postcss: [
      require('autoprefixer')({
        browsers: ['last 2 versions']
      })
    ]
  }
};









