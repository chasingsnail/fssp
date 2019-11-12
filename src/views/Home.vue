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
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="50%"
    >

      <div class="qs-cell">
        <div class="qs-title">您遇到的问题类型<span class="highlight">（必填）</span>：</div>
        <div class="qs-input">
          <el-checkbox-group v-model="typeList">
            <el-checkbox label="service">系统服务</el-checkbox>
            <el-checkbox label="quality">服务品质</el-checkbox>
            <el-checkbox label="needs">新业务需求</el-checkbox>
            <el-checkbox label="intime">服务时效</el-checkbox>
            <el-checkbox label="change">业务变更需求</el-checkbox>
            <el-checkbox label="price">服务价格</el-checkbox>
          </el-checkbox-group>
        </div>
      </div>

      <div class="qs-cell">
        <div class="qs-title">问题描述<span class="highlight">（必填）</span>：</div>
        <div class="qs-input">
          <el-input
            type="textarea"
            :rows="3"
            placeholder="请简要描述您的问题或意见，您的宝贵意见将帮助我们提供更优质的服务，感谢您的支持！"
            v-model="desc"
          ></el-input>
        </div>
      </div>

      <div class="qs-cell">
        <div class="qs-title">图片<span class="info">（选填，提供问题截图）</span>：</div>
        <div class="qs-input">
          <div
            id="upfile"
            class="icon-upload"
          ></div>
          <!-- <button
            id="upfile"
            onclick="return false;"
            type="button"
            class="awsui-btn awsui-btn-blue"
          >文件上传</button>
          <input
            type="file"
            style="display:none;"
            id="upfile_upfile"
            multiple="multiple"
            accept=".jpg, .jpeg, .gif, .png, .bmp"
          > -->
        </div>
      </div>

      <div class="qs-cell">
        <div class="qs-title">联系电话：</div>
        <div class="qs-input">
          <el-input v-model="tel"></el-input>
        </div>
      </div>

      <div class="button-group">
        <el-button
          type="primary"
          @click="handleSubmit"
        >提交反馈</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Swiper from 'swiper'
import 'swiper/css/swiper.min.css'
import PrdHead from '@/components/PrdHead'
import PrdRank from '@/components/PrdRank'
export default {
  name: 'home',
  components: {
    PrdHead,
    PrdRank
  },
  data() {
    return {
      typeList: [],
      desc: '',
      tel: '',
      file: '',
      dialogVisible: false,
      prdList: ['product1', 'product2', 'product3', 'product4', 'product5']
    }
  },
  methods: {
    handleSubmit() {
      if (!this.typeList.length) {
        return this.$Utils.simpleAlert('请选择问题类型', 'warning')
      }
      if (!this.desc) {
        return this.$Utils.simpleAlert('请填写问题描述', 'warning')
      }
      const params = {
        type: this.typeList,
        desc: this.desc,
        file: this.file,
        tel: this.tel
      }
      console.log(params)
      // 接口请求...
      // if 提交成功
      this.reset()
      this.dialogVisible = false
      $.simpleAlert('提交成功', 'ok')
    },
    fillFeedback() {
      this.reset()
      this.dialogVisible = true
    },
    reset() {
      this.typeList = []
      this.desc = ''
      this.tel = ''
      this.file = ''
    },
    scrollToTop() {
      document.body.scrollTop = document.documentElement.scrollTop = 0
    },
    renderSwiper() {
      // eslint-disable-next-line
      var mySwiper = new Swiper('.swiper-container', {
        loop: true, // 循环模式选项
        autoplay: {
          // 自动播放
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
    background: #ff6600;
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
          background-image: url('../assets/images/feedback.png');
        }
        &.icon-scroll {
          background-image: url('../assets/images/scrollTop.png');
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
      background: url('../assets/images/normal_details_addphoto@2x.png')
        no-repeat center;
      background-size: 80px;
      cursor: pointer;
      &:hover {
        background-image: url('../assets/images/icon_details_addphoto@2x.png');
      }
    }
    .qs-input {
    }
  }
}
</style>
