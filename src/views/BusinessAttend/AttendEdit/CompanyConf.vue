<template>
  <div>
    <BlockHead
      icon="company"
      title="委托公司"
    />

    <div class="block-cell">

      <div class="operate-button">
        <el-button>刷新</el-button>
        <!-- <el-button
          type="primary"
          @click="handleAddRow"
        >新增</el-button> -->
        <el-button>保存</el-button>
        <el-button>选择已委托公司</el-button>
        <el-button
          type="danger"
          v-if="currentRowIndex || currentRowIndex === 0"
          @click="deleteRow"
        >删除</el-button>
        <el-button>批量导入</el-button>
      </div>

      <el-table
        :data="tableData"
        @selection-change="handleSelectionChange"
        style="width: 100%"
      >
        <el-table-column
          type="selection"
          width="55"
        >
        </el-table-column>
        <el-table-column
          prop="company"
          label="公司名称"
        >
        </el-table-column>
        <el-table-column
          prop="code"
          label="账套代码"
        >
        </el-table-column>
        <el-table-column
          prop="address"
          label="档案保管地"
        >
        </el-table-column>
        <el-table-column
          prop="register"
          label="注册地"
        >
        </el-table-column>
        <el-table-column
          prop="receive"
          label="资料接单地"
        >
        </el-table-column>
      </el-table>
      <div class="page-bar">
        <el-pagination
          layout="prev, pager, next"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import BlockHead from '@/components/BlockHead'
export default {
  props: {
    tableData: Array,
    total: Number
  },
  components: {
    BlockHead
  },
  data() {
    return {
      multipleSelection: [],
      currentRowIndex: null
    }
  },
  mounted() {},
  methods: {
    handleSelectionChange(val) {
      console.log(val)
      this.multipleSelection = val
      this.$emit('fetchProduct', val)
    },
    tableRowClassName({ row, rowIndex }) {
      row.index = rowIndex
    },
    handleRowSelect(row) {
      this.currentRowIndex = row.index
    },
    deleteRow() {
      this.tableData.splice(this.currentRowIndex, 1)
      this.currentRowIndex = null
    }
  }
}
</script>

<style scoped lang="scss">
.block-cell {
  padding: 0 20px;
  .operate-button {
    padding: 20px 0;
  }
  .company-link {
    padding: 20px 0 30px;
    font-size: 12px;
  }
}
.page-bar {
  margin-top: 12px;
  text-align: center;
}
</style>
