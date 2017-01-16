<template>
  <div>
    <v-header v-bind:seller="seller"></v-header>
    <ul class='tab border-1px'>
      <li class='tab-item'>
        <router-link to="/goods">商品</router-link>
      </li>
      <li class='tab-item'>
        <router-link to="/ratings">评价</router-link>
      </li>
      <li class='tab-item'>
        <router-link to="/seller">商家</router-link>
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>
<script type="text/ecmascript-6">
  import header from './components/header/header';
  const ERR_OK = 0;
  export default {
    data () {
      return {
        seller: {}
      };
    },
    created () {
      this.$http.get('/api/seller').then((res) => {
        res = res.body;
        if (res.erron === ERR_OK) {
          this.seller = res.data;
        }
      });
    },
    components: {
      'v-header': header
    }
  };
</script>
<style scoped lang="scss" rel="stylesheet/scss" type="text/css">
  @import "common/css/mixin";

  .tab {
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    @include border-1px(rgba(7, 17, 27, 0.1));
    .tab-item {
      flex: 1;
      text-align: center;
      & > a {
        display: block;
        font-size: 14px;
        color: rgb(77, 85, 93);
      }
      .router-link-active {
        color: rgb(240, 20, 20);
      }
    }
  }
</style>
