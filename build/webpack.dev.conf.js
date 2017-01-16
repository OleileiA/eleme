var config = require('../config');
var webpack = require('webpack');

//webpack-merge负责合并配置文件。
var merge = require('webpack-merge');

//utils一些工具函数。
var utils = require('./utils');

//基础webpack配置文件，被开发环境和生产环境共享。
var baseWebpackConfig = require('./webpack.base.conf');

//webpack提供的操作html文件的插件
var HtmlWebpackPlugin = require('html-webpack-plugin');
var FriendlyErrors = require('friendly-errors-webpack-plugin');

// add hot-reload related code to entry chunks
//启动热加载代码，
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
});

module.exports = merge(baseWebpackConfig, {
  module: {
    /*这个loaders 可以loader单独的css文件*/
    loaders: utils.styleLoaders({sourceMap: config.dev.cssSourceMap})
  },
  // eval-source-map is faster for development
  devtool: '#eval-source-map',
  plugins: [
    //把源码中的process.env替换成config.dev.env
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    //webpack优化插件
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin

    //非常重要的一个插件，主文件index默认引入生成的js文件。
    new HtmlWebpackPlugin({
      filename: 'index.html',/*生成的文件*/
      template: 'index.html',/*原来的模板文件*/
      inject: true
    }),
    new FriendlyErrors()
  ]
});
