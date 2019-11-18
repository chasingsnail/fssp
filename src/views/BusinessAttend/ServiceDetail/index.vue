<template>
  <div class="main-content detail-wrap">
    <div class="content">
      <div class="prd-panel">
        <img
          src="../../../assets/images/pic_product1.png"
          alt="prd_pic"
          width="282"
          height="212"
        >
        <div class="prdName">
          <h4 class="name"><i class="icon-name"></i>记账总账</h4>
          <div class="prd-desc"></div>
          <div class="operate-block">
            <el-button
              type="primary"
              @click="handleConfirm"
            >确认</el-button>
            <el-button
              type="info"
              @click="handleClose"
            >关闭</el-button>
          </div>
        </div>
      </div>
      <div class="tab-wrap">
        <el-tabs
          v-model="activeName"
          type="card"
        >
          <el-tab-pane
            label="产品详情"
            name="detail"
          >
            <Tip>请按照实际需要填写月预估量，若填写偏差较大会影响时间的收费和高档系数。</Tip>

            <el-table
              :data="tableData"
              style="width: 100%"
            >
              <el-table-column
                prop="check"
                width="80"
              >
                <template slot-scope="scope">
                  <el-checkbox-group v-model="checkList">
                    <el-checkbox
                      :label="scope.row.id"
                      :key="scope.row.id"
                    ></el-checkbox>
                  </el-checkbox-group>
                </template>
              </el-table-column>
              <el-table-column
                prop="name"
                label="产品服务"
              >
              </el-table-column>
              <el-table-column
                prop="handbook"
                label="手册"
              >
                <template>
                  <el-link @click="handleUpload">标准手册</el-link>
                </template>
              </el-table-column>
              <el-table-column
                prop="pass"
                label="准入"
              >
              </el-table-column>
              <el-table-column
                prop="unit"
                label="单位"
              >
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane
            label="业务办理须知"
            name="note"
          >
            <Tip>感谢您选择<span class="highlight">金服财务服务中心</span>，办理业务前，请详细阅读以下事项，如有疑问可在<a
                class="link"
                href="/"
              >意见反馈</a>处联系我们</Tip>
            <Note></Note>
          </el-tab-pane>
          <el-tab-pane
            label="业务办理流程"
            name="progress"
          >
            <div class="progress-wrap">
              <div class="progress-title">业务办理流程</div>
              <img
                src="../../../assets/images/steps_business_process@2x.png"
                alt="step"
                width="821"
                height="102"
              >
            </div>
          </el-tab-pane>
          <el-tab-pane
            label="常见问题"
            name="question"
          >
            <div class="qs-wrap">
              <div class="qs-title">相关问题</div>
              <Collapse
                v-for="(item, index) in questions"
                :key="index"
                :index="index + 1"
                :config="item"
              ></Collapse>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>

    <el-dialog
      title="上传手册"
      :visible.sync="dialogVisible"
      width="50%"
    >
      <div class="upload-content">
        <div class="row-cell">
          <a
            class="download-link"
            href="/"
          >标准手册点击下载</a>
          <div class="upload-butt">
            <span class="fileName">上传附件</span>
            <el-button
              type="primary"
              @click="upfile(true)"
            >选择文件</el-button>
            <input
              ref="book"
              type="file"
              hidden
              @change="checkFile($event, true)"
            >
          </div>
        </div>
        <div class="row-cell">
          <a
            class="download-link"
            href="/"
          >手册对比表点击下载</a>
          <div class="upload-butt">
            <span class="fileName">上传附件</span>
            <el-button
              type="primary"
              @click="upfile(false)"
            >选择文件</el-button>
            <input
              ref="bookCompare"
              type="file"
              hidden
              @change="checkFile($event, false)"
            >
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Tip from './Tip'
import Note from './Note'
import Collapse from './Collapse'
import { getStorage, setStorage } from '@/utils/storage'
export default {
  components: {
    Tip,
    Note,
    Collapse
  },
  data() {
    return {
      questions: [
        {
          q:
            'Q：新增委托的独立法人公司，如果不单独签订SLA服务合同，可以单独开具账单及发票吗？',
          a:
            'A：服务费开票是基于合同基础，如果没有合同主体，无法支撑开具发票，即财务无法支持开票。服务费开票是基于合同基础，如果没有合同主体，无法支撑开具发票，即财务无法支持开票。服务费开票是基于合同基础，如果没有合同主体，无法支撑开具发票，即财务无法支持开票。服务费开票是基于合同基础，如果没有合同主体，无法支撑开具发票，即财务无法支持开票。服务费开票是基于合同基础，如果没有合同主体，无法支撑开具发票，即财务无法支持开票。服务费开票是基于合同基础，如果没有合同主体，无法支撑开具发票，即财务无法支持开票。服务费开票是基于合同基础，如果没有合同主体，无法支撑开具发票，即财务无法支持开票。'
        },
        {
          q:
            'Q：新增委托的独立法人公司，如果不单独签订SLA服务合同，可以单独开具账单及发票吗？',
          a:
            'A：服务费开票是基于合同基础，如果没有合同主体，无法支撑开具发票，即财务无法支持开票。服务费开票是基于合同基础，如果没有合同主体，无法支撑开具发票，即财务无法支持开票。服务费开票是基于合同基础，如果没有合同主体，无法支撑开具发票，即财务无法支持开票。服务费开票是基于合同基础，如果没有合同主体，无法支撑开具发票，即财务无法支持开票。服务费开票是基于合同基础，如果没有合同主体，无法支撑开具发票，即财务无法支持开票。服务费开票是基于合同基础，如果没有合同主体，无法支撑开具发票，即财务无法支持开票。服务费开票是基于合同基础，如果没有合同主体，无法支撑开具发票，即财务无法支持开票。'
        }
      ],
      dialogVisible: false,
      checkList: [],
      activeName: 'detail',
      tableData: [],
      currentItem: {}
    }
  },
  methods: {
    handleConfirm() {
      this.tableData.forEach(item => {
        if (this.checkList.includes(item.id)) {
          item.active = true
        }
      })
      const _data = {
        ...this.currentItem,
        subs: this.tableData
      }
      setStorage('checkService', _data)
      this.$router.go(-1)
    },
    handleClose() {
      this.$router.go(-1)
    },
    upfile(isBook) {
      const { book, bookCompare } = this.$refs
      const node = isBook ? book : bookCompare
      node.click()
    },
    checkFile(e, isBook) {
      const file = e.target.file
      console.log(file)
    },
    fetchData() {
      this.currentItem = getStorage('checkService')
      this.tableData = this.currentItem.subs
      this.renderCheck()
    },
    renderCheck() {
      this.checkList = this.tableData
        .filter(item => item.active)
        .map(item => item.id)
    },
    handleUpload() {
      this.dialogVisible = true
    }
  },
  mounted() {
    this.fetchData()
  }
}
</script>

<style scoped lang="scss">
.detail-wrap {
  padding-top: 14px;
  .content {
    padding: 28px 20px;
    background-color: #fff;
    .prd-panel {
      display: flex;
      .prdName {
        flex: 1;
        margin-left: 40px;
        .icon-name {
          display: inline-block;
          width: 24px;
          height: 24px;
          margin-right: 10px;
          background: url('../../../assets/images/icon_product@2x.png')
            no-repeat center;
          background-size: contain;
          vertical-align: bottom;
        }
        .name {
          height: 33px;
          font-size: 24px;
        }
        .prd-desc {
          width: 480px;
          height: 41px;
          margin-top: 20px;
          background: rgba(245, 166, 35, 0.1);
          border-radius: 1px;
          border: 1px solid rgba(204, 204, 204, 1);
        }
        .operate-block {
          margin-top: 54px;
        }
      }
    }
    .tab-wrap {
      margin-top: 70px;
      /deep/ .el-tabs__item {
        width: 200px;
        height: 48px;
        line-height: 48px;
        font-size: 18px;
        font-weight: bold;
        text-align: center;
        box-sizing: content-box;
      }
      /deep/ .el-tabs--card > .el-tabs__header {
        .el-tabs__nav {
          border-color: transparent transparent #e4e7ed transparent;
        }
        .el-tabs__item {
          border-left: none;
          &.is-active {
            border-top: 3px solid #ff6600;
            border-left: 1px solid #ff6600;
            border-right: 1px solid #ff6600;
          }
        }
      }
      /deep/ .el-table th.is-leaf {
        background-color: #fff;
        border-bottom: 1px solid #ebeef5;
      }
      /deep/ .el-checkbox__label {
        display: none;
      }
      .qs-wrap {
        padding: 0 40px;
        .qs-title {
          margin-bottom: 7px;
          font-size: 18px;
          font-weight: bold;
          color: rgba(51, 51, 51, 1);
          line-height: 25px;
        }
      }
      .progress-wrap {
        padding-bottom: 50px;
        text-align: center;
        .progress-title {
          font-size: 24px;
          color: rgba(38, 39, 41, 1);
          line-height: 33px;
          margin: 80px 0 50px;
        }
      }
    }
  }
}
.upload-content {
  padding: 50px 100px 20px;
  .row-cell {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .download-link {
      color: #409ff5;
    }
    .fileName {
      margin-right: 10px;
    }
    & + .row-cell {
      margin-top: 24px;
    }
  }
}
</style>
