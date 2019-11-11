<template>
  <div class="home-wrap">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <img
            src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1573323262149&di=12b524a9945b67beb11c7a625edd5a23&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01dea958a566d2a801219c77c47a22.png"
            alt=""
            width="100%"
            height="auto"
          >
        </div>
        <div class="swiper-slide">
          <img
            src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1573323262149&di=12b524a9945b67beb11c7a625edd5a23&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01dea958a566d2a801219c77c47a22.png"
            alt=""
            width="100%"
            height="auto"
          >
        </div>
        <div class="swiper-slide">
          <img
            src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1573323262149&di=12b524a9945b67beb11c7a625edd5a23&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01dea958a566d2a801219c77c47a22.png"
            alt=""
            width="100%"
            height="auto"
          >
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </div>
  </div>
</template>

<script>
import Swiper from 'swiper'
import 'swiper/css/swiper.min.css'
export default {
  name: 'home',
  methods: {
    renderSwiper() {
      // eslint-disable-next-line
      var mySwiper = new Swiper('.swiper-container', {
        loop: true, // 循环模式选项
        autoplay: { // 自动播放
          delay: 3000
        },
        // 分页
        pagination: {
          el: '.swiper-pagination'
        }
      })
    }
  },
  mounted() {
    this.renderSwiper()
  }
}
</script>

<style lang="scss" scoped>
.home-wrap {
  /deep/ .swiper-pagination-bullet-active {
    background: #FF6600;
  }
}
</style>
