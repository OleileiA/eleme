/**
 * Created by cyw on 2017/1/29.
 */
/* 工具函数的模块 */
/* 1.解析url参数 */
export function urlParse () {
  let url = window.location.search;
  let obj = {};
  /* 第一个中括号匹配?&,然后匹配非?&(多个),在匹配=号,在匹配非?&,最后全局 */
  let reg = /[?&][^?&]+=[^?&]+/g;
  let arr = url.match(reg);
  if (arr) {
    arr.forEach((item) => {
      let tempArr = item.substring(1).split('=');
      let key = decodeURIComponent(tempArr[0]);
      let value = decodeURIComponent(tempArr[1]);
      obj[key] = value;
    });
  }
  return obj;
};
