<template>
  <div>
    <input
      ref="upfile"
      type="file"
      hidden
      multiple
      @change="checkFile"
    >
    <BlockHead
      icon="company"
      title="委托公司"
    />

    <div class="block-cell">

      <div class="operate-button">
        <el-button>刷新</el-button>
        <el-button
          type="primary"
          @click="handleAddRow"
        >新增</el-button>
        <el-button style="margin-left: 0">保存</el-button>
        <el-button
          type="danger"
          v-if="currentRowIndex || currentRowIndex === 0"
          @click="deleteRow"
        >删除</el-button>
        <el-button>批量导入</el-button>
      </div>

      <el-table
        :data="tableData"
        :row-class-name="tableRowClassName"
        highlight-current-row
        @row-click="handleRowSelect"
        style="width: 100%"
      >
        <el-table-column
          prop="company"
          label="委托公司名称"
          header-align="center"
          minWidth="180"
          align="center"
        >
          <template slot-scope="scope">
            <el-select
              v-model="scope.row.company"
              placeholder="请选择"
            >
              <el-option
                v-for="item in companyOpts"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column
          prop="code"
          label="账套代码"
          header-align="center"
          minWidth="180"
          align="center"
        >
          <template slot-scope="scope">
            <el-input v-model="scope.row.code"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="address"
          label="档案保管地"
          header-align="center"
          minWidth="180"
          align="center"
        >
          <template slot-scope="scope">
            <el-select
              v-model="scope.row.address"
              placeholder="请选择"
            >
              <el-option
                v-for="item in addressOpts"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column
          prop="register"
          label="注册地"
          header-align="center"
          minWidth="180"
          align="center"
        >
          <template slot-scope="scope">
            <el-select
              v-model="scope.row.register"
              placeholder="请选择"
            >
              <el-option
                v-for="item in registerOpts"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column
          prop="receive"
          label="资料接单地"
          header-align="center"
          minWidth="180"
          align="center"
        >
          <template slot-scope="scope">
            <el-select
              v-model="scope.row.receive"
              placeholder="请选择"
            >
              <el-option
                v-for="item in receiveOpts"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column
          prop="accountType"
          label="账户类型"
          header-align="center"
          minWidth="180"
          align="center"
        >
          <template slot-scope="scope">
            <el-select
              v-model="scope.row.accountType"
              placeholder="请选择"
            >
              <el-option
                v-for="item in accountTypeOpts"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column
          prop="accountBank"
          label="开户行"
          header-align="center"
          minWidth="180"
          align="center"
        >
          <template slot-scope="scope">
            <el-input v-model="scope.row.accountBank"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="accountNum"
          label="账户数量"
          header-align="center"
          minWidth="180"
          align="center"
        >
          <template slot-scope="scope">
            <el-input v-model="scope.row.accountNum"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="materials"
          label="补充资料"
          header-align="center"
          minWidth="180"
          align="center"
        >
          <template slot-scope="scope">
            <div
              v-for="(item, index) in scope.row.files"
              :key="index"
            >{{item.name}}</div>
            <el-button
              type="primary"
              @click="chooseFile(scope.$index)"
            >选择文件</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="company-link">
        <el-link type="primary">查看已委托公司>></el-link>
      </div>
    </div>
  </div>
</template>

<script>
import BlockHead from '@/components/BlockHead'
const getNewRow = () => {
  return {
    company: '',
    code: '',
    address: '',
    register: '',
    receive: '',
    accountType: '',
    accountBank: '',
    accountNum: '',
    files: []
  }
}
export default {
  props: {
    tableData: Array
  },
  components: {
    BlockHead
  },
  data() {
    return {
      currentRowIndex: null,
      currentFileIndex: null,
      companyOpts: [
        {
          value: '1',
          label: 'xx公司'
        }
      ],
      addressOpts: [
        {
          value: '1',
          label: '地址'
        }
      ],
      registerOpts: [
        {
          value: '1',
          label: '注册'
        }
      ],
      receiveOpts: [
        {
          value: '1',
          label: '接单1'
        }
      ],
      accountTypeOpts: [
        {
          value: '1',
          label: '账户类型1'
        }
      ]
    }
  },
  mounted() {},
  methods: {
    chooseFile(index) {
      this.currentFileIndex = index
      this.$refs.upfile.click()
    },
    checkFile(e) {
      const files = e.target.files
      const _files = this.tableData[this.currentFileIndex].files
      this.tableData[this.currentFileIndex].files = [..._files, ...files]
      console.log(files)
    },
    handleAddRow() {
      this.tableData.push(getNewRow())
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
</style>
