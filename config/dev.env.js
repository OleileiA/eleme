/*merge 模块，用于合并模块 */
/* https://www.npmjs.com/package/webpack-merge */
var merge = require('webpack-merge');
var prodEnv = require('./prod.env');
/**/
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"'
});
