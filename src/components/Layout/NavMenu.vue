<template>
  <div class="nav-wrap">
    <div class="nav-list main-content">
      <div class="head-nav active">首页</div>
      <div class="head-nav">
        业务全景图
        <SubItem />
      </div>
      <div class="head-nav">
        业务办理
        <SubItem />
      </div>
      <div class="head-nav">购物车</div>
      <div class="head-nav">关于我们</div>
    </div>
  </div>
</template>

<script>
import SubItem from './SubItem'
export default {
  props: {},
  components: {
    SubItem
  },
  data() {
    return {}
  },
  mounted() {},
  methods: {}
}
</script>

<style scoped lang="scss">
.nav-wrap {
  background-color: #f9f9f9;
  .nav-list {
    display: flex;
    height: 38px;
    line-height: 38px;
    font-size: 18px;
    color: #333;
    .head-nav {
      position: relative;
      height: 38px;
      margin-right: 50px;
      cursor: pointer;
      &.active {
        color: #ff6600;
        &::after {
          position: absolute;
          left: 50%;
          bottom: 0;
          content: '';
          width: 28px;
          height: 2px;
          transform: translateX(-50%);
          background-color: #ff6600;
        }
      }
      &:hover {
        /deep/ .sub-wrap {
          display: block;
        }
      }
    }
  }
}
</style>
