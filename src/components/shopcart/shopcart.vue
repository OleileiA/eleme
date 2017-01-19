<style scoped lang="scss" rel="stylesheet/scss" type="text/css">
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
        flex: 0 0 270px;
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
  }
</style>
<template>
  <div class="shopcart">
    <div class="content">
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
      <div class="content-right">
        <div class="pay" :class="{'green': totalPrice >= minPrice}">{{payDesc}}</div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
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
    }
  };
</script>
