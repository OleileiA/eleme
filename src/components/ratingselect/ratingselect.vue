<style scoped lang="scss" rel="stylesheet/scss" type="text/css">
  @import "../../common/css/mixin";

  .ratingSelect {
    .ratingType {
      font-size: 0;
      padding: 18px;
      @include border-1px(rgba(7, 17, 27, .1));
      .block {
        font-size: 12px;
        display: inline-block;
        padding: 8px 12px;
        margin-right: 8px;
        border-radius: 1px;
        color: rgb(77, 85, 93);
        &.active {
          color: #fff;
        }
        &.positive {
          background-color: rgba(0, 160, 220, .2);
          &.active {
            background-color: rgb(0, 160, 220);
          }
        }
        &.negative {
          background-color: rgba(77, 85, 93, .2);
          &.active {
            background-color: rgb(77, 85, 93);
          }
        }
        .count {
          margin-left: 2px;
          font-size: 8px;
        }
      }
    }
    .switch {
      font-size: 0;
      padding: 12px 18px;
      line-height: 24px;
      border-bottom: 1px solid rgba(7, 17, 27, .1);
      color: rgb(147, 153, 159);
      .icon-check_circle {
        display: inline-block;
        font-size: 24px;
        margin-right: 4px;
        vertical-align: top;
      }
      .text {
        display: inline-block;
        font-size: 12px;
      }
    }
    .on {
      .icon-check_circle {
        color: #00cb35;
      }
    }
  }
</style>
<template>
  <div class="ratingSelect">
    <div class="ratingType border-1px">
      <span class="block positive" :class="{'active': selectType==2}" @click.stop.prevent="select(2, $event)">{{desc.all}}<span
      class="count">{{ratings.length}}</span></span>
      <span class="block positive" :class="{'active': selectType==0}" @click.stop.prevent="select(0, $event)">{{desc.positive}}<span
      class="count">{{ positives.length}}</span></span>
      <span class="block negative" :class="{'active': selectType==1}" @click.stop.prevent="select(1, $event)">{{desc.negative}}<span
      class="count">{{negatives.length}}</span></span>
    </div>
    <div class="switch" :class="{'on': onlyContent}" @click.stop.prevent="toggleContent">
      <span class="icon-check_circle"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  const POSITIVE = 0;
  const NEGATIVE = 1;
  const ALL = 2;

  export default {
    props: {
      ratings: {
        type: Array,
        default () {
          return [];
        }
      },
      selectType: {
        type: Number,
        default: ALL
      },
      onlyContent: {
        type: Boolean,
        default: false
      },
      desc: {
        type: Object,
        default () {
          return {
            all: '全部',
            positive: '满意',
            negative: '不满意'
          };
        }
      }
    },
    methods: {
      select (type, event) {
        if (!event._constructed) {
          return false;
        }
        this.selectType = type;
        this.$emit('ratingtypeSelect', type);
        /* 但是在vuejs2.0中，任何试图在组件内修改通过props传入的父组件数据都被认为是anti-pattern的，报以下错误： */
        /* Avoid mutating a prop directly since the value will be overwritten whenever the parent component re-renders */
        /* 但是不影响使用，可以使用vuex重构解决这些问题 */
      },
      toggleContent () {
        if (!event._constructed) {
          return false;
        }
        this.onlyContent = !this.onlyContent;
        this.$emit('contentToggle', this.onlyContent);
        /* 但是在vuejs2.0中，任何试图在组件内修改通过props传入的父组件数据都被认为是anti-pattern的，报以下错误： */
        /* Avoid mutating a prop directly since the value will be overwritten whenever the parent component re-renders */
        /* 但是不影响使用，可以使用vuex重构解决这些问题 */
      }
    },
    computed: {
      positives () {
        return this.ratings.filter((rating) => {
          return rating.rateType === POSITIVE;
        });
      },
      negatives () {
        return this.ratings.filter((rating) => {
          return rating.rateType === NEGATIVE;
        });
      }
    }
  };
</script>
