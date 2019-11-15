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
        <el-button
          type="primary"
          @click="handleQuery"
        >查询</el-button>
        <el-button type="primary">导出清单</el-button>
      </div>
    </div>
    <div class="table-wrap">
      <div class="operate-bar">
        <el-button
          type="primary"
          @click="newAttend"
        >新增委托</el-button>
      </div>
      <el-table
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column
          prop="management"
          label="管理主体"
        >
        </el-table-column>
        <el-table-column
          prop="account"
          label="账号主体"
        >
        </el-table-column>
        <el-table-column
          prop="mode"
          label="委托模式"
        >
        </el-table-column>
        <el-table-column
          prop="fund"
          label="资金属性"
        >
        </el-table-column>
        <el-table-column
          prop="company"
          label="委托公司名称"
        >
        </el-table-column>
        <el-table-column
          prop="accountName"
          label="账套名称"
        >
        </el-table-column>
        <el-table-column
          prop="code"
          label="账单代码"
        >
        </el-table-column>
      </el-table>
      <div class="page-bar">
        <el-pagination
          layout="prev, pager, next"
          :total="total"
          :page-size="20"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      total: 0,
      tableData: [],
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
  computed: {},
  methods: {
    newAttend() {
      this.$router.push({ name: 'attendAdd' })
    },
    handleQuery() {
      // ajax..
      this.tableData = [
        {
          management: '集团',
          account: '集团财务'
        }
      ]
      this.total = 10
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
.table-wrap {
  padding: 20px;
  .operate-bar {
    margin-bottom: 12px;
  }
}
.page-bar {
  margin-top: 12px;
  text-align: center;
}
</style>
