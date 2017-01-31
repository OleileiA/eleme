<style lang='scss' rel='stylesheet/scss' scoped>
  @import "../../common/css/mixin";

  .goods {
    position: absolute;
    display: flex;
    width: 100%;
    top: 174px;
    bottom: 46px;
    overflow: hidden;
    .menu-wrapper {
      flex: 0 0 80px;
      width: 80px;
      height: 100%;
      background-color: #f3f5f7;
      .menu-item {
        display: table;
        height: 54px;
        width: 56px;
        line-height: 14px;
        padding: 0 12px;
        text-align: center;
        .icon {
          position: relative;
          bottom: -1px;
          display: inline-block;
          vertical-align: top;
          height: 12px;
          width: 12px;
          margin-right: 2px;
          background-size: 12px 12px;
          background-repeat: no-repeat;
          &.decrease {
            @include bg-image('decrease_3');
          }
          &.discount {
            @include bg-image('discount_3');
          }
          &.guarantee {
            @include bg-image('guarantee_3');
          }
          &.invoice {
            @include bg-image('invoice_3');
          }
          &.special {
            @include bg-image('special_3');
          }
        }
        .text {
          display: table-cell;
          width: 56px;
          vertical-align: middle;
          font-size: 12px;
          @include border-1px(rgba(7, 17, 27, .1));
        }
      }
      ul li:last-child {
        .text:after {
          display: none;
        }
      }
      .current {
        position: relative;
        margin-top: -1px;
        background-color: #fff;
        z-index: 10;
        font-weight: 700;
        .text:after {
          display: none;
        }
      }
    }
    .foods-wrapper {
      height: 100%;
      flex: 1;
      .title {
        padding-left: 14px;
        height: 26px;
        line-height: 26px;
        border-left: 2px solid #d9dde1;
        font-size: 12px;
        color: rgb(147, 153, 159);
        background-color: #f3f5f7;
      }
      .food-item {
        display: flex;
        margin: 18px;
        padding-bottom: 18px;
        @include border-1px(rgba(7, 17, 27, .1));
        &:last-child:after {
          border-top: none;
        }
        .icon {
          flex: 0 0 57px;
          margin-right: 10px;
        }
        .content {
          flex: 1;
          .name {
            margin: 2px 0 8px;
            height: 14px;
            line-height: 14px;
            font-size: 14px;
            color: rgb(7, 17, 27);
          }
          .description {
            margin-bottom: 8px;
            line-height: 12px;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
          .extra {
            font-size: 10px;
            line-height: 10px;
            color: rgb(147, 153, 159);
            .count {
              margin-right: 12px;
            }
          }
          .price {
            font-weight: 700;
            line-height: 24px;
            .now {
              margin-right: 8px;
              font-size: 14px;
              color: rgb(240, 20, 20);
            }
            .old {
              text-decoration: line-through;
              font-size: 10px;
              color: rgb(147, 153, 159);
            }
          }
          .cartcontrol-wrapper {
            position: absolute;
            right: 0;
            bottom: 12px;
          }
        }
      }
    }
  }
</style>
<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(item,index) in goods" class="menu-item" :class="{'current': currentIndex==index}"
            @click="selectMenu(index,$event)">
          <span class="text"><span class="icon" v-bind:class="classMap[item.type]" v-show="item.type>0"></span>{{item.name}}</span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li v-for="item in goods" class="food-list food-list-hook">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods" class="food-item border-1px" @click="selectFood(food, $event)">
              <div class="icon"><img width="57" height="57" v-bind:src="food.icon" alt="food-icon"></div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="description">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span><span v-show="food.oldPrice"
                                                                class="old">￥{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="food" v-on:cartAdd="getTarget"></cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice" :select-foods="selectFoods"
              ref="shopCart"></shopcart>
      <food :food="selectedFood" ref="foodDetail" v-on:foodBall="getTarget"></food>
  </div>
</template>
<script type='text/ecmascript-6'>
  import BScroll from 'better-scroll';
  import shopcart from '../shopcart/shopcart.vue';
  import cartcontrol from '../cartcontrol/cartcontrol.vue';
  import food from '../food/food.vue';
  const ERR_OK = 0;
  export default {
    data () {
      return {
        goods: [],
        listHeight: [],
        scrollY: 0,
        selectedFood: {},
        shopCart: this.$refs.shopCart
      };
    },
    props: {
      seller: {
        type: Object
      }
    },
    computed: {
      currentIndex () {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i + 1];
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i;
          }
        }
        return 0;
      },
      selectFoods () {
        let foods = [];
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              foods.push(food);
            }
          });
        });
        return foods;
      }
    },
    created () {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
      this.$http.get('/api/goods').then((res) => {
        res = res.body;
        if (res.erron === ERR_OK) {
          this.goods = res.data;
        }
        this.$nextTick(() => {
//          更新DOM后初始化滚动实例
          this._initScroll();
//          计算高度ul高度
          this._calculateHeight();
        });
      });
    },
    methods: {
      _initScroll () {
        this.ms = new BScroll(this.$refs.menuWrapper, {
          /* better-click会默认阻止点击事件，这里要配置成允许 */
          click: true
        });
        this.fs = new BScroll(this.$refs.foodsWrapper, {
          click: true,
          /* 这个配置项表示，scroll在滚动的时候能实时告诉位置。 */
          probeType: 3
        });
        /* 监听滚动的实例的滚动事件，获得实时的Y值 */
        this.fs.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y));
        });
      },
      _calculateHeight () {
        /* 获取食物li数组 */
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
        let height = 0;
        this.listHeight.push(height);
        for (let i = 0; i < foodList.length; i++) {
          height += foodList[i].clientHeight;
          this.listHeight.push(height);
        }
      },
      selectMenu (index, ev) {
        /* 原生的点击事件 ev_constructed是没有这个属性的，return掉了 */
        /* better-scroll派发的这个事件属性为true */
        /* 这样就不会再桌面端点击触发两次事件。 */
        if (!ev._constructed) {
          return false;
        }
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
        let ele = foodList[index];
        this.fs.scrollToElement(ele, 300);
      },
      getTarget (target) {
        this.$nextTick(() => {
          this.$refs.shopCart.drop(target);
        });
      },
      selectFood (food, event) {
        if (!event._constructed) {
          return false;
        }
        this.selectedFood = food;
        this.$refs.foodDetail.show();
      }
    },
    components: {
      shopcart,
      cartcontrol,
      food
    }
  };
</script>
