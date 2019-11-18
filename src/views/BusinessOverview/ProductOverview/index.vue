<template>
  <div class="main-content page-wrap">

    <DataDesc>
      财务服务中心提供8大项产品线，<span class="highlight">53</span>项服务。
    </DataDesc>

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

      <div class="operate-item">
        <el-button><i class="el-icon-download"></i>导出已委托产品</el-button>
      </div>
    </div>

    <div class="prd-chart">
      <PrdChart />
    </div>
  </div>
</template>

<script>
import DataDesc from '@/components/DataDesc'
import PrdChart from './PrdCharts'
export default {
  name: 'productList',
  components: {
    DataDesc,
    PrdChart
  },
  data() {
    return {
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
      ]
    }
  },
  mounted() {}
}
</script>

<style scoped lang="scss">
.filter-bar {
  padding: 20px;
  border-bottom: 1px solid #dddddd;
  .filter-item {
    display: inline-block;
    margin-right: 40px;
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
.prd-chart {
  padding: 74px 160px;
}
</style>
