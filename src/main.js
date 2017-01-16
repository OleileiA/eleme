// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import App from './App';
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import Goods from './components/goods/goods';
import Ratings from './components/ratings/ratings';
import Seller from './components/seller/seller';
/* 在style标签里面@import,y也可以直接在js里面import */
import './common/css/index.scss';

Vue.use(VueRouter);
Vue.use(VueResource);

const routes = [
  // 在这里可以使用重定向解决，初始api默认为空时，router-link-active 时候的样式问题
  // 还可以使用组件的方法或计算属性来解决，我暂时用上面这种方法
  {path: '', redirect: '/goods'},
  {path: '/goods', component: Goods},
  {path: '/ratings', component: Ratings},
  {path: '/seller', component: Seller}
];
const router = new VueRouter({
  routes
});
/* eslint-disable no-new */
new Vue({
  components: {App},
  template: '<App/>',
  router
}).$mount('#app');
