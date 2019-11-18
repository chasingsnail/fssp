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
    <div class="page-view">
      <Breadcrumb
        v-if="showBread"
        :matchedRoutes="$route.matched"
      />
      <keep-alive include="attendEdit,attendAdd,productOverview">
        <router-view />
      </keep-alive>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from './Header'
import NavMenu from './NavMenu'
import Footer from './Footer'
import Breadcrumb from './Breadcrumb'
export default {
  components: {
    Header,
    NavMenu,
    Footer,
    Breadcrumb
  },
  computed: {
    showBread() {
      return (
        !this.$route.meta || (this.$route.meta && !this.$route.meta.noBread)
      )
    }
  },
  data() {
    return {}
  },
  mounted() {
    console.log(this.$route.matched)
  },
  methods: {}
}
</script>

<style scoped lang="scss">
.main-wrap {
  /deep/ .main-content {
    width: 1200px;
    margin: 0 auto;
  }
  /deep/ .page-wrap {
    background-color: #fff;
  }
}

.page-view {
  background-color: #efefef;
  padding-bottom: 20px;
}
.logo-wrap {
  padding: 30px 0;
}
</style>
