<template>
  <div class="bread-wrap">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item
        v-for="route in matchedRoutes"
        :key="route.name"
      >{{route.meta.routeName}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  props: {
    matchedRoutes: Array
  },
  data() {
    return {}
  },
  mounted() {},
  methods: {}
}
</script>

<style scoped lang="scss">
.bread-wrap {
  width: 1200px;
  margin: 0 auto;
  padding: 20px 0 10px;
}
</style>
