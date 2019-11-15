<template>
  <div class="main-content page-wrap">
    <div class="filter-bar">
      <div class="filter-item">
        <label class="label">账单主题</label>
        <el-select
          v-model="account"
          placeholder="请选择"
        >
          <el-option
            v-for="item in accountOpt"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>

      <div class="filter-item">
        <label class="label">委托模式</label>
        <el-select
          v-model="mode"
          placeholder="请选择"
        >
          <el-option
            v-for="item in modeOpt"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>

      <div class="filter-item">
        <label class="label">资金属性</label>
        <el-select
          v-model="attr"
          placeholder="请选择"
        >
          <el-option
            v-for="item in attrOpt"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>

      <div class="filter-item">
        <label class="label">期望生效时间</label>
        <el-date-picker
          v-model="happenedTime"
          type="date"
          placeholder="选择日期"
        >
        </el-date-picker>
      </div>

      <div class="operate-item">
        <el-button
          type="primary"
          @click="handleQuery"
        >查询</el-button>
      </div>

    </div>

    <companyConf
      :tableData="tableData"
      :total="totalCount"
      @fetchProduct="fetchProduct"
    />

    <ProductConf ref="prd" />

    <div class="submit-block">
      <el-button
        type="primary"
        @click="handleSubmit"
      >提交</el-button>
    </div>

  </div>
</template>

<script>
import companyConf from './CompanyConf'
import ProductConf from './ProductConf'

export default {
  name: 'attendEdit',
  components: {
    companyConf,
    ProductConf
  },
  data() {
    return {
      isFetch: false, // 判断是否已请求商品
      tempArr: null,
      totalCount: 0, // 总页数
      tableData: [],
      happenedTime: '',
      account: '',
      mode: '',
      attr: '',
      accountOpt: [
        {
          value: 1,
          label: '集团稽核'
        },
        {
          value: 2,
          label: 'option2'
        }
      ],
      modeOpt: [
        {
          value: 1,
          label: 'option1'
        }
      ],
      attrOpt: [
        {
          value: 1,
          label: 'option1'
        }
      ],
      checkedPrd: []
    }
  },
  computed: {},
  methods: {
    handleQuery() {
      const params = {
        happenedTime: this.happenedTime,
        account: this.account,
        mode: this.mode,
        attr: this.attr
      }
      console.log(params)
      // 接口请求...
      this.tableData = [
        {
          company: 'XX公司',
          code: 'X123',
          address: 'address Street',
          register: 'register Street',
          receive: 'receive Street'
        }
      ]
      this.totalCount = 1
    },
    // 根据选择公司查询产品
    fetchProduct(arr) {
      this.isFetch = true
      this.tempArr = arr
      console.log(arr)
      // 模拟处理参数
      const params = arr.map(item => item.id)
      // 调用子组件方法
      if (arr.length) {
        this.$refs.prd.fetchData(params)
      } else {
        this.$refs.prd.clearData()
      }
    },
    handleApply() {},
    handleSubmit() {
      console.log(this.tableData) // 表格数据
      console.log(this.$refs.prd.prdList) // 已选产品
    }
    // setPrdList(list) {
    //   this.checkedPrd = list
    // }
  },
  activated() {
    if (this.isFetch) {
      this.fetchProduct(this.tempArr)
    }
  },
  beforeRouteLeave(to, from, next) {
    if (to.name !== 'serviceDetail') {
      this.$destroy(this.$options.name)
    }
    next()
  },
  mounted() {}
}
</script>

<style scoped lang="scss">
.page-wrap {
  padding-bottom: 20px;
}
.filter-bar {
  padding: 20px;
  border-bottom: 1px solid #dddddd;
  .filter-item {
    position: relative;
    display: inline-block;
    vertical-align: top;
    & + .filter-item {
      margin-left: 40px;
    }
    /deep/ .el-date-editor.el-input {
      width: 160px;
    }
  }
  .operate-item {
    float: right;
  }
  .label {
    margin-right: 8px;
    font-size: 14px;
    color: #333333;
  }
  /deep/ .el-select {
    width: 160px;
  }
}
.submit-block {
  margin-top: 20px;
  text-align: center;
  /deep/ .el-button {
    width: 180px;
  }
}
</style>
