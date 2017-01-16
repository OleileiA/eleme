/*这个文件是入口文件，在npm script中默认 npm run dev 中 用node启动*/
/*第一个引入的模块的是check-versions文件*/
/*check-version就是检查 node 和 npm 的版本，require进来的是一个函数，所以直接执行*/
/*我的node 和 npm版本是7.2.1 和3.10.10，符合要求，所以在命令行没有警告语句。*/
require('./check-versions')();

//引入配置文件模块
/*require的就是config文件夹中的默认入口文件*/
var config = require('../config');

/*如果环境变量还没有设置，就设定为 'development'*/
if (!process.env.NODE_ENV) process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV);
//引入node path模块
var path = require('path');

//引入node框架 express
var express = require('express');
var app = express();
var appData = require('../data.json');
var seller = appData.seller;
var goods = appData.goods;
var ratings = appData.ratings;
var apiRoutes = express.Router();
apiRoutes.get('/seller', function (req, res) {
  res.json({
    erron: 0,
    data: seller
  });
});
apiRoutes.get('/goods', function (req, res) {
  res.json({
    erron: 0,
    data: goods
  });
});
apiRoutes.get('/ratings', function (req, res) {
  res.json({
    erron: 0,
    data: ratings
  });
});
app.use('/api',apiRoutes);


//引入webpack模块
var webpack = require('webpack');

/*const opn = require('opn');
 opn('unicorn.png').then(() => {
 // image viewer closed
 });
 opn('http://sindresorhus.com');
 opn('http://sindresorhus.com', {app: 'firefox'});
 opn('http://sindresorhus.com', {app: ['google chrome', '--incognito']});*/
var opn = require('opn');

//引入http代理中间件
var proxyMiddleware = require('http-proxy-middleware');
/*var express = require('sxpress');
 var proxy = require('http-proxy-middleware');

 var context = '/object/api';//context 可以使一个数组['/object/api','/object2/api',...]
 var options = {
 target: 'http://www.target.org',//目标服务器地址
 changeOrigin: true,             //虚拟主机网站需要
 headers: {                      //添加token,用于开发
 'Authorization': 'Bearer ' + token,
 'x-api-version': 1
 }
 }

 var apiProxy =  proxy(context, options);
 var app = express();
 app.use(apiProxy);
 app.listen(3000);*/

/*在这里引入的是，webpack的dev文件*/
var webpackConfig = require('./webpack.dev.conf');

// default port where dev server listens for incoming traffic
//指定接口
var port = process.env.PORT || config.dev.port;
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware

//拿到需要代理的接口
var proxyTable = config.dev.proxyTable;


var compiler = webpack(webpackConfig);
/*webpack-dev-middleware中间件*/
/*把例如app.js也就是编译好的文件，在目录中并没有，其实是这个插件把它放到内存中了*/
var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
});

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {
  }
});

// force page reload when html-webpack-plugin template changes
//html-webpack-plugin模板文件改变的时候，触发页面的reload，配合热加载
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({action: 'reload'});
    cb()
  })
});

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context];
  if (typeof options === 'string') {
    options = {target: options}
  }
  app.use(proxyMiddleware(context, options))
});

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')());

// serve webpack bundle output
app.use(devMiddleware);

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware);

// serve pure static assets
//配置static静态资源访问路径。
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory);
app.use(staticPath, express.static('./static'));

var uri = 'http://localhost:' + port;

devMiddleware.waitUntilValid(function () {
  console.log('> Listening at ' + uri + '\n')
});

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err);
    return
  }

  // when env is testing, don't need open it
  if (process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
});
