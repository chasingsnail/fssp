<template>
  <div class="desc-wrap">
    <i class="icon-desc"></i>
    <slot></slot>
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
.desc-wrap {
  display: flex;
  align-items: center;
  height: 62px;
  padding: 0 20px;
  font-size: 14px;
  color: #333333;
  border-bottom: 1px solid #dddddd;
  .icon-desc {
    display: inline-block;
    width: 22px;
    height: 22px;
    margin-right: 10px;
    background: url('../assets/images/pic_logo_small@2x.png') no-repeat center;
    background-size: 22px;
  }
  .highlight {
    color: #ff6600;
  }
}
</style>
