<template>
  <div class="main-wrap">
    <Header />
    <div class="logo-wrap">
      <div class="main-content">
        <a href="/">
          <img
            src="../../assets/images/pic_logo.png"
            alt="logo"
            width="220"
            height="40"
          >
        </a>
      </div>
    </div>
    <NavMenu />
    <router-view />
  </div>
</template>

<script>
import Header from './Header'
import NavMenu from './NavMenu'
export default {
  components: {
    Header,
    NavMenu
  },
  data() {
    return {}
  },
  mounted() {},
  methods: {}
}
</script>

<style scoped lang="scss">
.main-wrap /deep/ .main-content {
  width: 1200px;
  margin: 0 auto;
}
.logo-wrap {
  padding: 30px 0;
}
</style>
