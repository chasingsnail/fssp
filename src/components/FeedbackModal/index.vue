<template>
  <el-dialog
    title="提示"
    :visible.sync="dialogVisible"
    width="50%"
  >

    <div class="qs-cell">
      <div class="qs-title">您遇到的问题类型<span class="highlight">（必填）</span>：</div>
      <div class="qs-input">
        <el-checkbox-group v-model="form.typeList">
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
          v-model="form.desc"
        ></el-input>
      </div>
    </div>

    <div class="qs-cell">
      <div class="qs-title">图片<span class="info">（选填，提供问题截图）</span>：</div>
      <div class="qs-input">
        <div
          id="upfile"
          class="icon-upload"
          @click="handleUpload"
        ></div> -->

        <!-- <button
            id="upfile"
            onclick="return false;"
            type="button"
            class="awsui-btn awsui-btn-blue"
          >文件上传</button> -->
        <input
          type="file"
          hidden
          ref="upfile"
          multiple="multiple"
          @change="checkFile"
          accept=".jpg, .jpeg, .gif, .png, .bmp"
        />
      </div>
    </div>

    <div class="qs-cell">
      <div class="qs-title">联系电话：</div>
      <div class="qs-input">
        <el-input
          v-model="form.tel"
          placeholder="请留下您的常用联系方式，便于我们及时反馈您的意见"
        ></el-input>
      </div>
    </div>

    <div class="footer-button">
      <el-button
        type="primary"
        @click="handleSubmit"
      >提交反馈</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    form: Object
  },
  data() {
    return {
      dialogVisible: false
    }
  },
  computed: {},
  methods: {
    open() {
      this.dialogVisible = true
    },
    handleUpload() {
      this.$refs.upfile.click()
    },
    // 获取选择的文件流
    checkFile(e) {
      console.log(e.target.files)
      this.files = [...this.form.files, ...e.target.files] // 合并数组
      console.log(this.files)
    },
    handleSubmit() {
      if (!this.form.typeList.length) {
        return this.$Utils.simpleAlert('请选择问题类型', 'warning')
      }
      if (!this.form.desc) {
        return this.$Utils.simpleAlert('请填写问题描述', 'warning')
      }
      const params = {
        type: this.form.typeList,
        desc: this.form.desc,
        file: this.form.files,
        tel: this.form.tel
      }
      console.log(params)
      // 接口请求...
      // if 提交成功
      this.dialogVisible = false
      $.simpleAlert('提交成功', 'ok')
    }
  },
  mounted() {}
}
</script>

<style scoped lang="scss">
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
.footer-button {
  text-align: center;
}
</style>
