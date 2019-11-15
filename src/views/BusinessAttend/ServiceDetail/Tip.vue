<template>
  <div class="tip-wrap">
    <i class="icon-tip"></i>
    <span>
      <slot></slot>
    </span>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {}
  },
  computed: {},
  methods: {},
  mounted() {}
}
</script>

<style scoped lang="scss">
.tip-wrap {
  display: inline-flex;
  align-items: center;
  height: 30px;
  margin: 5px 0 20px;
  padding: 0 6px;
  background: rgba(245, 166, 35, 0.1);
  font-size: 12px;
  .icon-tip {
    display: inline-block;
    width: 20px;
    height: 20px;
    margin-right: 6px;
    background: url('../../../assets/images/icon_bulb.png') no-repeat center;
    background-size: contain;
  }
  .highlight {
    color: #f5a623;
  }
  .link {
    color: #409ff5;
  }
}
</style>
