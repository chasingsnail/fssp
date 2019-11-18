<template>
  <div class="inner-wrap">
    <div
      class="item-inner"
      :class="{right: rightSide}"
    >
      <transition :name="setTransform(index)">
        <div
          class="activePanel"
          @click="handleToDetail(subInfo)"
          v-if="active"
        >
          <div class="pannel-info">
            <h5>{{subInfo.name}}</h5>
            <p>{{subInfo.percent}}%</p>
          </div>
          <i class="icon-active"></i>
        </div>
      </transition>
      <i class="icon-uncheck"></i>
      <span class="inner-text">{{subInfo.name}}</span>
    </div>
    <GreyLine
      :index="index"
      :endPos="subInfo.endY"
      :active="active"
    ></GreyLine>
  </div>
</template>

<script>
import GreyLine from './GreyLine'
export default {
  components: {
    GreyLine
  },
  props: {
    subInfo: Object,
    index: Number,
    active: Boolean
  },
  data() {
    return {}
  },
  computed: {
    rightSide() {
      return this.index % 2 !== 0
    }
  },
  methods: {
    handleToDetail(info) {
      this.$router.push({
        name: 'productDetail',
        query: {
          parent: info.parentName,
          extra: info.name,
          id: info.code
        }
      })
    },
    setTransform(index) {
      return index % 2 === 0 ? 'scaleToLeft' : 'scaleToRight'
    }
  },
  mounted() {}
}
</script>

<style scoped lang="scss">
.inner-wrap {
  display: inline-block;
}
.item-inner {
  position: relative;
  width: 200px;
  border-radius: 24px;
  text-align: right;
  .inner-text {
    display: inline-block;
    height: 48px;
    margin: 0 12px;
    line-height: 48px;
    vertical-align: top;
  }
  &.right {
    justify-content: flex-start;
    text-align: left;
    .icon-uncheck {
      float: left;
    }
    .icon-active {
      float: left;
    }
    .activePanel .pannel-info {
      text-align: left;
    }
  }
  .icon-uncheck {
    float: right;
    width: 48px;
    height: 48px;
    background: url('../../../../assets/images/icon_service_unsel@2x.png')
      no-repeat center;
    background-size: 48px;
  }
  .icon-active {
    float: right;
    width: 40px;
    height: 40px;
    background: url('../../../../assets/images/icon_service_sel@2x.png')
      no-repeat center;
    background-size: 40px;
    background-color: #fff;
    border-radius: 50%;
    margin-top: 4px;
  }
  .activePanel {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 48px;
    // display: flex;
    // justify-content: flex-end;
    // align-items: center;
    padding: 0 4px;
    background-color: #f5a623;
    border-radius: 24px;
    font-size: 14px;
    color: #fff;
    cursor: pointer;
    .pannel-info {
      display: inline-block;
      margin: 3px 12px;
      line-height: 1.5;
      color: #fff;
      text-align: right;
      vertical-align: bottom;
    }
  }
}
</style>
<style lang="scss">
.scaleToLeft-enter-active {
  animation: scale-to-left 0.2s linear;
}
.scaleToLeft-leave-active {
  animation: scale-to-left 0.2s reverse;
}
.scaleToRight-enter-active {
  animation: scale-to-right 0.2s linear;
}
.scaleToRight-leave-active {
  animation: scale-to-right 0.2s reverse;
}
@keyframes scale-to-left {
  0% {
    transform: scaleX(0);
    transform-origin: right center;
  }
  50% {
    transform: scaleX(0.5);
    transform-origin: right center;
  }
  100% {
    transform: scaleX(1);
    transform-origin: right center;
  }
}
@keyframes scale-to-right {
  0% {
    transform: scaleX(0);
    transform-origin: left center;
  }
  50% {
    transform: scaleX(0.5);
    transform-origin: left center;
  }
  100% {
    transform: scaleX(1);
    transform-origin: left center;
  }
}
</style>
