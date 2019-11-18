<template>
  <keep-alive>
    <router-view></router-view>
  </keep-alive>
</template>

<script>
export default {
  name: 'productOverview',
  components: {},
  data() {
    return {}
  },
  computed: {},
  methods: {},
  beforeRouteLeave(to, from, next) {
    this.$destroy(this.$options.name)
    next()
  },
  mounted() {}
}
</script>

<style scoped lang="scss">
</style>
