<template>
  <div class="bread-wrap">
    <el-breadcrumb separator="/">
      <template v-for="route in matchedRoutes">
        <el-breadcrumb-item
          v-if="route.meta.routeName"
          :key="route.name"
        >{{route.meta.routeName}}</el-breadcrumb-item>
      </template>
      <el-breadcrumb-item v-if="extraKey">{{extraKey}}</el-breadcrumb-item>
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
  computed: {
    extraKey() {
      return this.$route.query && this.$route.query.extra
    }
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
