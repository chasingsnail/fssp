<template>
  <div class="badge-wrap">
    <div class="badge-item">
      <i class="icon-attend"></i>
      <span class="text">已委托</span>
    </div>
    <div class="badge-item">
      <i class="icon-no-attend"></i>
      <span class="text">未委托</span>
    </div>
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
.badge-wrap {
  text-align: right;
  .badge-item {
    display: inline-block;
    margin-left: 30px;
    .text {
      margin-left: 8px;
      vertical-align: super;
      font-size: 14px;
      color: #333333;
    }
    .icon {
      display: inline-block;
      width: 28px;
      height: 28px;
      background: no-repeat center;
      background-size: contain;
      &.icon-use {
        background-image: url('../../../assets/images/icon_entrusted@2x.png');
      }
      &.icon-unuse {
        background-image: url('../../../assets/images/icon_no_entrust@2x.png');
      }
    }
  }
}
</style>
