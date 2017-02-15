<style scoped lang="scss" rel="stylesheet/scss" type="text/css">
  @import "../../common/css/mixin";

  .shopcart {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 50;
    width: 100%;
    height: 48px;
    .content {
      display: flex;
      background-color: #141d27;
      .content-left {
        display: flex;
        flex: 1 0 270px;
        width: 270px;
        font-size: 0;
        .logo-wrapper,
        .price,
        .desc {
          display: inline-block;
          vertical-align: top;
        }
        .logo-wrapper {
          flex: 0 0 56px;
          position: relative;
          box-sizing: border-box;
          top: -10px;
          margin: 0 0 0 12px;
          padding: 6px;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background-color: #141d27;
          .logo {
            display: block;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background-color: #2b343c;
            text-align: center;
            .icon-shopping_cart {
              font-size: 24px;
              line-height: 44px;
              color: #80858a;
            }
            &.high-light {
              background-color: rgb(0, 160, 220);
              .icon-shopping_cart {
                color: #fff;
              }
            }
          }
          .num {
            position: absolute;
            top: 0;
            left: 30px;
            height: 16px;
            width: auto;
            padding: 0 5px;
            line-height: 16px;
            text-align: center;
            border-radius: 16px;
            color: #fff;
            font-size: 9px;
            font-weight: 700;
            background-color: rgb(240, 20, 20);
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, .4);
          }
        }
        .price {
          flex: 1 1 -1px;
          color: rgba(255, 255, 255, .4);
          font-size: 16px;
          line-height: 24px;
          font-weight: 700;
          margin-top: 12px;
          padding-right: 12px;
          box-sizing: border-box;
          border-right: 1px solid rgba(255, 255, 255, .1);
          &.high {
            color: #fff;
          }
        }
        .desc {
          flex: 1;
          margin: 12px 0 0 12px;
          line-height: 24px;
          font-size: 10px;
          color: rgba(255, 255, 255, .4);
          text-align: center;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
      .content-right {
        flex: 0 0 105px;
        width: 105px;
        .pay {
          font-size: 12px;
          font-weight: 700;
          line-height: 48px;
          height: 48px;
          text-align: center;
          color: rgba(255, 255, 255, .4);
          background-color: #2b343c;
          &.green {
            background-color: #00b43c;
            color: #fff;
          }
        }
      }
    }
    .ball-container {
      .ball {
        position: fixed;
        left: 32px;
        bottom: 22px;
        z-index: 200;
        &.drop-enter-active, &.drop-leave-active {
          transition: all .4s cubic-bezier(.48, 0, 1, .56);
          .inner {
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background-color: rgb(0, 160, 220);
            transition: all .4s linear;
          }
        }
      }
    }
    .shopcart-list {
      position: absolute;
      left: 0;
      top: 0;
      z-index: -1;
      width: 100%;
      transform: translate3d(0, -100%, 0);
      &.fold-enter-active {
        transform: translate3d(0, -100%, 0);
      }
      &.fold-enter-active, &.fold-leave-active {
        transition: all .5s;
      }
      &.fold-enter, &.fold-leave-active {
        transform: translate3d(0, 0, 0);
      }
      .list-header {
        height: 40px;
        line-height: 40px;
        padding: 0 18px;
        background-color: #f3f5f7;
        border-bottom: 1px solid rgba(7, 17, 27, .1);
        .title {
          float: left;
          font-size: 14px;
          color: rgb(7, 17, 27);

        }
        .empty {
          float: right;
          font-size: 12px;
          color: rgb(0, 160, 220);
        }
      }
      .list-content {
        padding: 0 18px;
        max-height: 217px;
        background-color: #fff;
        overflow: hidden;
        .food {
          position: relative;
          padding: 12px 0;
          box-sizing: border-box;
          @include border-1px(rgba(7, 17, 27, 1));
          &:last-child:after {
            border-top: none;
          }
          .name {
            line-height: 24px;
            font-size: 14px;
            color: rgb(7, 17, 27);
          }
          .price {
            position: absolute;
            right: 90px;
            bottom: 12px;
            line-height: 24px;
            font-size: 14px;
            font-weight: 700;
            color: rgb(240, 20, 20);
          }
          .cartcontrol-wrapper {
            position: absolute;
            right: 0;
            bottom: 6px;
          }
        }

      }
    }
  }

  .list-mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -2;
    backdrop-filter: blur(10px);
    background-color: rgba(7, 17, 27, .6);
    &.mask-enter-active, &.mask-leave-active {
      transition: opacity .4s;
    }
    &.mask-enter, &.mask-leave-active {
      opacity: 0;
    }
  }


</style>
<template>
  <div class="shopcart">
    <div class="content" @click="toggleList">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{'high-light': totalCount > 0}">
            <i class="icon-shopping_cart"></i>
          </div>
          <div class="num" v-if="totalCount > 0">{{totalCount}}</div>
        </div>
        <div class="price" :class="{'high': totalPrice>0}">￥{{totalPrice}}</div>
        <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
      </div>
      <div class="content-right" @click.stop.prevent="pay">
        <div class="pay" :class="{'green': totalPrice >= minPrice}">{{payDesc}}</div>
      </div>
    </div>
    <!-- 小球坠落效果，把小球定义在购物车处。 -->
    <div class="ball-container">
      <transition-group name="drop" tag="div" v-on:before-enter="beforeEnter" v-on:enter="enter"
                        v-on:after-enter="afterEnter">
        <div v-for="ball in balls" v-show="ball.show" class="ball" v-bind:key="ball">
          <div class="inner inner-hook"></div>
        </div>
      </transition-group>
    </div>
    <transition name="fold">
      <div class="shopcart-list" v-show="listShow">
        <div class="list-header">
          <h1 class="title">购物车</h1>
          <span class="empty" @click="empty">清空</span>
        </div>
        <div class="list-content" ref="listContent">
          <ul>
            <li class="food" v-for="food in selectFoods">
              <span class="name">{{food.name}}</span>
              <div class="price">
                <span>￥{{food.price * food.count}}</span>
              </div>
              <div class="cartcontrol-wrapper">
                <cartcontrol v-bind:food="food" v-on:cartAdd="drop"></cartcontrol>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
    <transition name="mask">
      <div class="list-mask" v-show="listShow" @click="hideList"></div>
    </transition>
  </div>
</template>
<script type="text/ecmascript-6">
  import cartcontrol from '../cartcontrol/cartcontrol.vue';
  import BScroll from 'better-scroll';
  export default {
    data () {
      return {
        balls: [
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          }
        ],
        dropBalls: [],
        fold: false
      };
    },
    props: {
      selectFoods: {
        type: Array,
        default () {
          return [];
        }
      },
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      }
    },
    computed: {
      listShow () {
        if (!this.totalCount) {
          this.fold = true;
          return false;
        }
        let show = !this.fold;
        if (show) {
          /* 不用每次都实例化，scroll实例，存在实例refresh就可以。 */
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new BScroll(this.$refs.listContent, {
                click: true
              });
            } else {
              this.scroll.refresh();
            }
          });
        }
        return show;
      },
      totalPrice () {
        let total = 0;
        this.selectFoods.forEach((food) => {
          total += food.price * food.count;
        });
        if (total) {
          return total;
        } else {
          return 0;
        }
      },
      totalCount () {
        let count = 0;
        this.selectFoods.forEach((food) => {
          count += food.count;
        });
        return count;
      },
      payDesc () {
        if (this.totalPrice === 0) {
          return `￥${this.minPrice}元起送`;
        } else if (this.totalPrice < this.minPrice) {
          let diff = this.minPrice - this.totalPrice;
          return `还差￥${diff}元起送`;
        } else {
          return '去结算';
        }
      }
    },
    methods: {
      toggleList () {
        if (!this.totalCount) {
          return false;
        }
        this.fold = !this.fold;
      },
      drop (el) {
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i];
          if (!ball.show) {
            ball.show = true;
            ball.el = el;
            this.dropBalls.push(ball);
            return false;
          }
        }
      },
      beforeEnter (el) {
        let count = this.balls.length;
        while (count--) {
          let ball = this.balls[count];
          if (ball.show) {
            /* 获取元素相对于视口的位置 */
            let rect = ball.el.getBoundingClientRect();
            /* x,y是元素相对于购物车的位移 */
            let x = rect.left - 32;
            let y = -(window.innerHeight - rect.top - 22);
            el.style.display = '';
            el.style.webkitTransform = `translate3d(0, ${y + 15}px, 0)`;
            el.style.transform = `translate3d(0, ${y + 15}px, 0)`;
            /* 获取内层元素去做横向运动 */
            let inner = el.getElementsByClassName('inner-hook')[0];
            inner.style.webkitTransform = `translate3d(${x}px, 0, 0)`;
            inner.style.transform = `translate3d(${x}px, 0, 0)`;
          }
        }
      },
      enter (el) {
        /* 触发浏览器重绘 */
        /* eslint-disable no-unused-vars */
        let rf = el.offsetHeight;

        el.style.webkitTransform = 'translate3d(0, 0, 0)';
        el.style.transform = 'translate3d(0, 0, 0)';
        /* 获取内层元素去做横向运动 */
        let inner = el.getElementsByClassName('inner-hook')[0];
        inner.style.webkitTransform = 'translate3d(0, 0, 0)';
        inner.style.transform = 'translate3d(0, 0, 0)';
      },
      afterEnter (el) {
        let ball = this.dropBalls.shift();
        if (ball) {
          ball.show = false;
          el.style.display = 'none';
        }
      },
      empty () {
        /* 清空购物车的方法 */
        this.selectFoods.forEach((food) => {
          food.count = 0;
        });
      },
      hideList () {
        this.fold = true;
      },
      pay () {
        if (this.totalPrice < this.minPrice) {
          return false;
        }
        window.alert(`需要支付${this.totalPrice}元`);
      }
    },
    components: {
      cartcontrol
    }
  };
</script>
