<template>
  <div class="sub-wrap">
    <div class="sub-item"><i class="awsui-iconfont">&#58914;</i>产品全景图</div>
    <div class="sub-item"><i class="awsui-iconfont">&#58914;</i>白名单全景图</div>
    <div class="sub-item"><i class="awsui-iconfont">&#58914;</i>公司全景图</div>
    <div class="sub-item"><i class="awsui-iconfont">&#58914;</i>委托查询及处理</div>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {}
  },
  mounted() {},
  methods: {}
}
</script>

<style scoped lang="scss">
.sub-wrap {
  position: absolute;
  top: 38px;
  left: -80px;
  display: flex;
  white-space: nowrap;
  background: rgba(0, 0, 0, 0.6);
  box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.5);
  display: none;
  z-index: 100;
  .sub-item {
    display: inline-flex;
    align-items: center;
    height: 96px;
    padding: 0 30px;
    white-space: nowrap;
    color: #fff;
    i {
      margin-right: 14px;
    }
    &:hover, &.active {
      color: #F5A623;
    }
  }
}
</style>
