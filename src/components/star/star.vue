<style scoped lang="scss" rel="stylesheet/scss" type="text/css">
  @import "../../common/css/mixin";

  .star {
    font-size: 0;
    &.star-48 {
      .on, .half, .off {
        width: 20px;
        height: 20px;
        margin-right: 22px;
        background-size: 20px 20px;
      }
      .on {
      @include bg-image('star48_on');
      }
      .half {
      @include bg-image('star48_half');
      }
      .off {
      @include bg-image('star48_off');
      }
    }
    &.star-36 {
      .on, .half, .off {
        width: 15px;
        height: 15px;
        margin-right: 6px;
        background-size: 15px 15px;
      }
      .on {
      @include bg-image('star36_on');
      }
      .half {
      @include bg-image('star36_half');
      }
      .off {
      @include bg-image('star36_off');
      }
    }
    &.star-24 {
      .on, .half, .off {
        width: 10px;
        height: 10px;
        margin-right: 3px;
        background-size: 10px 10px;
      }
      .on {
      @include bg-image('star24_on');
      }
      .half {
      @include bg-image('star24_half');
      }
      .off {
      @include bg-image('star24_off');
      }
    }
    .star-item {
      display: inline-block;
      background-repeat: no-repeat;
      &:last-child {
        margin-right: 0;
      }
    }
  }
</style>
<template>
  <div class="star" v-bind:class="starType">
    <span class="star-item" v-for="itemClass in itemClasses" v-bind:class="itemClass"></span>
  </div>
</template>
<script type="text/ecmascript-6">
  const LENGTH = 5;
  const CLS_ON = 'on';
  const CLS_HALF = 'half';
  const CLS_OFF = 'off';
  export default {
    props: {
      size: {
        type: Number
      },
      score: {
        type: Number
      }
    },
    computed: {
      starType () {
        return 'star-' + this.size;
      },
      itemClasses () {
        let result = [];
        let score = Math.floor(this.score * 2) / 2;
        let hasDecimal = score % 1 !== 0;
        let integer = Math.floor(score);
        for (let i = 0; i < integer; i++) {
          result.push(CLS_ON);
        }
        if (hasDecimal) {
          result.push(CLS_HALF);
        }
        while (result.length < LENGTH) {
          result.push(CLS_OFF);
        }
        return result;
      }
    }
  };
</script>
