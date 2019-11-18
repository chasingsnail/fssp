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
        <div class="tip">没有找到需要的账单主体？<el-link
            type="primary"
            @click="handleApply"
          >点击申请</el-link>
        </div>
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
        <div class="warn">
          <i class="el-icon-warning-outline"></i>提示：包干业务委托是月度生效，需按照全月收费。
        </div>
      </div>

    </div>

    <companyConf :tableData="tableData" />

    <ProductConf
      ref="prd"
      @setPrdList="setPrdList"
    />

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
import { removeStorage } from '@/utils/storage'
export default {
  name: 'attendAdd',
  components: {
    companyConf,
    ProductConf
  },
  data() {
    return {
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
    handleApply() {},
    handleSubmit() {
      console.log(this.tableData) // 表格数据
      console.log(this.checkedPrd) // 已选产品
    },
    setPrdList(list) {
      this.checkedPrd = list
    }
  },
  beforeRouteLeave(to, from, next) {
    if (to.name !== 'serviceDetail') {
      removeStorage('checkService')
      this.$destroy(this.$options.name)
    }
    next()
  },
  activated() {
    this.$refs.prd.reRender()
  }
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
    .tip {
      margin-top: 12px;
      font-size: 14px;
    }
    .warn {
      position: absolute;
      top: 54px;
      left: 90px;
      font-size: 12px;
      white-space: nowrap;
      color: #d0021b;
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
  text-align: center;
  /deep/ .el-button {
    width: 180px;
  }
}
</style>
