<style scoped lang="scss" rel="stylesheet/scss" type="text/css">
  .cartcontrol {
    font-size: 0;
    .count,
    .cart-add {
      display: inline-block;
      font-size: 24px;
      line-height: 24px;
      color: rgb(0, 120, 260);
      vertical-align: middle;
      text-align: center;
    }
    .cart-decrease,
    .cart-add {
      padding: 6px;
    }
    .count {
      line-height: 24px;
      font-size: 12px;
      width: 12px;
      color: rgb(147, 153, 159);
    }
    .cart-decrease {
      display: inline-block;
      text-align: center;
      vertical-align: top;
      .inner {
        display: inline-block;
        font-size: 24px;
        line-height: 24px;
        color: rgb(0, 120, 260);
      }
      &.move-enter-active, &.move-leave-active {
        transition: all .4s linear;
        opacity: 1;
        transform: translate3D(0, 0, 0);
        .inner {
          transition: all .4s linear;
          transform: rotate(0);
        }
      }
      &.move-enter, &.move-leave-active {
        opacity: 0;
        transform: translate3D(24px, 0, 0);
        .inner {
          transform: rotate(180deg);
        }
      }
    }

  }
</style>
<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="cart-decrease" v-if="food.count > 0" @click="decrease($event)">
        <span class="inner icon-remove_circle_outline"></span>
      </div>
    </transition>
    <div class="count" v-if="food.count > 0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click="add($event)"></div>
  </div>
</template>
<script type="text/ecmascript-6">
  import Vue from 'vue';
  export default {
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      add (event) {
        if (!event._constructed) {
          return false;
        }
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1);
        } else {
          this.food.count++;
        }
      },
      decrease (event) {
        if (!event._constructed) {
          return false;
        }
        if (this.food.count <= 0) {
          return false;
        }
        this.food.count--;
      }
    }
  };
</script>
