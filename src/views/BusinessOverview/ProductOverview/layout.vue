<template>
  <keep-alive>
    <router-view></router-view>
  </keep-alive>
</template>

<script>
export default {
  name: 'productOverview',
  beforeRouteLeave(to, from, next) {
    this.$destroy(this.$options.name)
    next()
  }
}
</script>
