<template>
  <div class="rank-wrap">
    <div class="prd-swiper-container">
      <div class="swiper-wrapper">
        <div
          class="swiper-slide"
          v-for="(item, index) in prdList"
          :key="index"
        >
          <div class="prd-item">
            <img
              src=""
              width="100%"
              height="285"
            >
            <div class="prdName">
              <div class="inner">{{item}}</div>
            </div>
            <div class="rankNum">
              <div class="top">TOP {{index + 1}}</div>
            </div>
          </div>
        </div>
      </div>
      <!-- Add Pagination -->
    </div>
    <div class="swiper-pagination"></div>
  </div>

</template>

<script>
import Swiper from 'swiper'
import 'swiper/css/swiper.min.css'
export default {
  props: {
    prdList: Array
  },
  data() {
    return {}
  },
  computed: {},
  methods: {},
  mounted() {
    // eslint-disable-next-line
    var swiper = new Swiper('.prd-swiper-container', {
      slidesPerView: 3,
      spaceBetween: 30,
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      }
    })
  }
}
</script>

<style scoped lang="scss">
.rank-wrap {
  /deep/ .prd-swiper-container {
    width: 100%;
    height: 100%;
    margin-left: auto;
    margin-right: auto;
    position: relative;
    overflow: hidden;
    list-style: none;
    padding: 0;
    z-index: 1;
  }
  /deep/ .swiper-pagination {
    position: relative;
    text-align: right;
    .swiper-pagination-bullet {
      width: 20px;
      height: 2px;
      margin: 0 4px;
      border-radius: 0;
    }
    .swiper-pagination-bullet-active {
      background: #ff6600;
    }
  }
}
.prd-item {
  position: relative;
  .prdName {
    position: absolute;
    top: 50%;
    left: 50%;
    padding: 4px;
    transform: translate(-50%, -50%);
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 2px;
    .inner {
      color: #fff;
      font-size: 30px;
      line-height: 42px;
      padding: 12px 40px;
      white-space: nowrap;
      background-color: rgba(0, 0, 0, 0.3);
      border-radius: 2px;
    }
  }
  .rankNum {
    position: absolute;
    top: 0;
    left: 0;
    width: 80px;
    height: 80px;
    background: url('../assets/images/tag_top_product@2x.png') no-repeat center;
    background-size: 100%;
    .top {
      position: absolute;
      top: 20px;
      left: 3px;
      font-size: 20px;
      color: #fff;
      transform: rotate(-45deg);
    }
  }
}
</style>
