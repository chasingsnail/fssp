<template>
  <div class="home-wrap">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <img
            src="../../assets/images/banner1.png"
            alt=""
            width="100%"
            height="auto"
          >
        </div>
        <div class="swiper-slide">
          <img
            src="../../assets/images/banner1.png"
            alt=""
            width="100%"
            height="auto"
          >
        </div>
        <div class="swiper-slide">
          <img
            src="../../assets/images/banner1.png"
            alt=""
            width="100%"
            height="auto"
          >
        </div>
      </div>
      <div class="home-swiper-pagination"></div>
    </div>
    <div class="main-content">

      <PrdHead
        title="明星产品"
        subTitle="STAR PRODUCT"
      ></PrdHead>

      <div class="prd-list">
        <PrdRank :prdList="prdList" />
        <div class="float-block">
          <div
            class="icon-block icon-feedback"
            @click="fillFeedback"
          ></div>
          <div
            class="icon-block icon-scroll"
            @click="scrollToTop"
          ></div>
        </div>
      </div>
    </div>
    <!-- 反馈 -->
    <FeedbackModal
      ref="feedback"
      :form="feebackForm"
    ></FeedbackModal>
  </div>
</template>

<script>
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
import PrdHead from './PrdHead'
import PrdRank from './PrdRank'
import FeedbackModal from '@/components/FeedbackModal'
export default {
  name: 'home',
  components: {
    PrdHead,
    PrdRank,
    FeedbackModal
  },
  data() {
    return {
      feebackForm: {
        typeList: [],
        desc: '',
        tel: '',
        files: []
      },

      dialogVisible: false,
      prdList: ['product1', 'product2', 'product3', 'product4', 'product5']
    }
  },
  methods: {
    // handleUpload() {
    //   this.$refs.upfile.click()
    // },
    // // 获取选择的文件流
    // checkFile(e) {
    //   console.log(e.target.files)
    //   this.files = [...this.files, ...e.target.files] // 合并数组
    //   console.log(this.files)
    // },
    // handleSubmit() {
    //   if (!this.typeList.length) {
    //     return this.$Utils.simpleAlert('请选择问题类型', 'warning')
    //   }
    //   if (!this.desc) {
    //     return this.$Utils.simpleAlert('请填写问题描述', 'warning')
    //   }
    //   const params = {
    //     type: this.typeList,
    //     desc: this.desc,
    //     file: this.file,
    //     tel: this.tel
    //   }
    //   console.log(params)
    //   // 接口请求...
    //   // if 提交成功
    //   this.reset()
    //   this.dialogVisible = false
    //   $.simpleAlert('提交成功', 'ok')
    // },
    fillFeedback() {
      this.reset()
      this.$refs.feedback.open()
    },
    reset() {
      this.feebackForm = {
        files: [],
        typeList: [],
        desc: '',
        tel: ''
      }
    },
    scrollToTop() {
      document.body.scrollTop = document.documentElement.scrollTop = 0
    },
    renderSwiper() {
      // eslint-disable-next-line
      var mySwiper = new Swiper('.swiper-container', {
        loop: true, // 循环模式选项
        // autoplay: {
        //   // 自动播放
        //   delay: 3000
        // },
        // 分页
        pagination: '.home-swiper-pagination',
        paginationClickable: true
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
    background: #ff6600;
  }
  .home-swiper-pagination {
    position: absolute;
    text-align: center;
    -webkit-transition: 0.3s;
    transition: 0.3s;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    z-index: 10;
  }
  .main-content {
    padding: 30px 0 50px;
  }
  .prd-list {
    position: relative;
    margin-top: 24px;
    .float-block {
      position: absolute;
      top: 0;
      right: -84px;
      .icon-block {
        width: 44px;
        height: 44px;
        margin-bottom: 10px;
        background: no-repeat center;
        background-size: 44px;
        cursor: pointer;
        &.icon-feedback {
          background-image: url('../../assets/images/feedback.png');
        }
        &.icon-scroll {
          background-image: url('../../assets/images/scrollTop.png');
        }
      }
    }
  }
  .qs-cell {
    margin-bottom: 20px;
    .qs-title {
      margin-bottom: 10px;
      line-height: 1.5;
      color: #262729;
      font-weight: bold;
      .highlight {
        color: #f5a623;
      }
      .info {
        color: #aaaaaa;
      }
    }
    .icon-upload {
      width: 80px;
      height: 80px;
      background: url('../../assets/images/normal_details_addphoto@2x.png')
        no-repeat center;
      background-size: 80px;
      cursor: pointer;
      &:hover {
        background-image: url('../../assets/images/icon_details_addphoto@2x.png');
      }
    }
  }
}
.footer-button {
  text-align: center;
}
</style>
