<template>
  <div class="main-content page-wrap">
    <div class="tab-wrap">
      <div class="tab-content">
        <div
          class="tab-item"
          :class="{active: currentType === 'all'}"
          @click="switchStatus('all')"
        >
          <div class="icon-wrap">
            <div class="icon-circle">
              <i class="icon icon-prd"></i>
            </div>
          </div>
          <h5 class="title">全部（6）</h5>
        </div>
        <div
          class="tab-item"
          :class="{active: currentType === 'new'}"
          @click="switchStatus('new')"
        >
          <div class="icon-wrap">
            <div class="icon-circle">
              <i class="icon icon-new"></i>
            </div>
          </div>
          <h5 class="title">新增委托（6）</h5>
        </div>
        <div
          class="tab-item"
          :class="{active: currentType === 'edit'}"
          @click="switchStatus('edit')"
        >
          <div class="icon-wrap">
            <div class="icon-circle">
              <i class="icon icon-shopping-edit"></i>
            </div>
          </div>
          <h5 class="title">变更委托（6）</h5>
        </div>
        <div
          class="tab-item"
          :class="{active: currentType === 'cancel'}"
          @click="switchStatus('cancel')"
        >
          <div class="icon-wrap">
            <div class="icon-circle">
              <i class="icon icon-shopping-cancel"></i>
            </div>
          </div>
          <h5 class="title">取消委托（6）</h5>
        </div>
      </div>
    </div>
    <div class="table-wrap">
      <div class="operate-block">
        <el-button type="primary">下一步</el-button>
        <el-button
          type="danger"
          v-if="checkList.length"
        >删除</el-button>
      </div>
      <el-table
        ref="multipleTable"
        :data="tableData"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="55"
        >
        </el-table-column>
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-row
              :gutter="40"
              class="expand-block"
            >
              <el-col
                :span="8"
                class="expand-cell"
              >
                <label class="label">订单类别</label>
                <div class="cell">
                  <el-input v-model="props.row.orderCategory"></el-input>
                </div>
              </el-col>
              <el-col
                :span="8"
                class="expand-cell"
              >
                <label class="label">账单主体</label>
                <div class="cell">
                  <el-input v-model="props.row.account"></el-input>
                </div>
              </el-col>
              <el-col
                :span="8"
                class="expand-cell"
              >
                <label class="label">委托模式</label>
                <div class="cell">
                  <el-input v-model="props.row.mode"></el-input>
                </div>
              </el-col>
            </el-row>
            <!-- <div>{{props.row.orderCategory}}</div> -->
          </template>
        </el-table-column>
        <el-table-column
          prop="orderCategory"
          label="订单类别"
        >
          <template slot-scope="scope">
            <div class="category-item">
              <i
                class="icon"
                :class="orderMap[scope.row.orderCategory].icon"
              ></i>
              <span class="inner-text">{{orderMap[scope.row.orderCategory].text}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="account"
          label="账单主体"
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
          prop="date"
          label="期望生效日期"
          min-width="340"
        >
          <template slot-scope="scope">
            <el-date-picker
              v-model="scope.row.date"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
            <span class="tip">
              <i class="el-icon-warning-outline"></i>
              提示：包干业务委托是月度生效，需按照全月收费。
            </span>
          </template>
        </el-table-column>
        <!-- <el-table-column
          prop="date"
          label="日期"
        >
        </el-table-column> -->
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
export default {
  components: {},
  data() {
    return {
      total: 2,
      orderMap: {
        1: {
          text: '新增',
          icon: 'orderNew'
        },
        2: {
          text: '变更',
          icon: 'orderChange'
        },
        3: {
          text: '取消',
          icon: 'orderCancel'
        }
      },
      tableData: [
        {
          orderCategory: '1',
          account: 'X123',
          mode: '融资1',
          date: '2019-11-11'
        },
        {
          orderCategory: '2',
          account: 'X124',
          mode: '融资2',
          date: '2019-11-11'
        }
      ],
      currentType: 'all',
      checkList: []
    }
  },
  computed: {},
  methods: {
    handleSelectionChange(val) {
      this.checkList = val
    },
    fetchData() {
      // ajax
    },
    switchStatus(type) {
      this.currentType = type
      this.fetchData()
    }
  },
  mounted() {
    this.fetchData()
  }
}
</script>

<style scoped lang="scss">
.tab-wrap {
  padding: 40px 20px 0;
  border-bottom: 1px solid #dddddd;
  .tab-content {
    margin-bottom: -1px;
    .tab-item {
      display: inline-flex;
      align-items: center;
      width: 200px;
      height: 52px;
      margin-right: 20px;
      border: 1px solid #dddddd;
      vertical-align: bottom;
      cursor: pointer;
      .icon-wrap {
        display: inline-block;
        width: 54px;
        height: 100%;
        line-height: 1;
        background-color: #aaaaaa;
        text-align: center;
        border-radius: 0 26px 26px 0;
        .icon-circle {
          display: inline-block;
          width: 40px;
          height: 40px;
          margin-top: 5px;
          background-color: #fff;
          border-radius: 50%;
          .icon {
            display: inline-block;
            width: 100%;
            height: 100%;
            background: no-repeat center;
            background-size: 35px;
            &.icon-company {
              background-image: url('../assets/images/pic_entrust_company@2x.png');
            }
            &.icon-prd {
              background-image: url('../assets/images/shopping_all_entrust@2x.png');
            }
            &.icon-new {
              background-image: url('../assets/images/shopping_add_entrust@2x.png');
            }
            &.icon-shopping-edit {
              background-image: url('../assets/images/shopping_change_entrust@2x.png');
            }
            &.icon-shopping-cancel {
              background-image: url('../assets/images/shopping_cancel_entrust@2x.png');
            }
          }
          // background: no-repeat center;
        }
      }
      .title {
        margin-left: 6px;
        line-height: 52px;
        font-size: 18px;
        font-weight: 700;
        color: #333;
      }
      &.active {
        border: 1px solid #f5a623;
        .title {
          color: #ff6600;
        }
        .icon-wrap {
          background-color: #ff6600;
          .icon {
            &.icon-prd {
              background-image: url('../assets/images/pic_entrust_product@2x.png');
            }
            &.icon-new {
              background-image: url('../assets/images/shopping_add_pre@2x.png');
            }
            &.icon-shopping-edit {
              background-image: url('../assets/images/shopping_change_pre@2x.png');
            }
            &.icon-shopping-cancel {
              background-image: url('../assets/images/shopping_cancel_pre@2x.png');
            }
          }
        }
      }
    }
  }
}
.table-wrap {
  padding: 40px 20px;
  .operate-block {
    margin-bottom: 12px;
  }
  .tip {
    display: inline-block;
    width: 165px;
    margin-left: 10px;
    font-size: 12px;
    color: rgba(208, 2, 27, 1);
    line-height: 17px;
    vertical-align: middle;
  }
  .expand-cell {
    display: flex;
    align-items: center;
    padding: 10px 20px;
    .label {
      margin-right: 8px;
    }
    .cell {
      flex: 1;
    }
  }
  .category-item {
    position: relative;
    height: 40px;
    .inner-text {
      display: inline-block;
      width: 90px;
      height: 36px;
      line-height: 36px;
      padding: 0 14px;
      margin-top: 2px;
      text-align: right;
      font-size: 14px;
      color: #333;
      background: rgba(255, 255, 255, 1);
      border-radius: 20px;
      border: 1px solid rgba(221, 221, 221, 1);
    }
    .icon {
      position: absolute;
      top: 0;
      left: 0;
      width: 40px;
      height: 40px;
      background: no-repeat center;
      background-size: contain;
      &.orderNew {
        background-image: url('../assets/images/shopping_add_entrust_pre@2x.png');
      }
      &.orderChange {
        background-image: url('../assets/images/shopping_change_entrust_pre@2x.png');
      }
      &.orderCancel {
        background-image: url('../assets/images/shopping_cancel_entrust_pre@2x.png');
      }
    }
  }
  /deep/ .el-date-editor.el-input {
    width: 160px;
  }
}
.page-bar {
  margin-top: 12px;
  text-align: center;
}
</style>
