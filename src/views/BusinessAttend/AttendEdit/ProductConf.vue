<template>
  <div>
    <BlockHead
      icon="prd"
      title="委托产品"
    />

    <div class="block-cell">
      <ul class="class-wrap">
        <li
          class="class-item"
          v-for="item in classList"
          :class="{active: activeClass === item.id}"
          @click="handleClassChange(item.id)"
          :key="item.id"
        >
          {{item.name}}
        </li>
      </ul>

      <el-row
        :gutter="20"
        v-if="prdList.length"
      >
        <el-checkbox-group
          v-model="checkedList"
          @change="handleCheckedChange"
        >
          <el-col
            :span="12"
            v-for="item in prdList"
            :key="item.id"
          >
            <div
              class="cell-wrap"
              :class="{active: checkStatus(item.subs)}"
            >
              <img
                src="../../../assets/images/pic_product1.png"
                width="212"
                height="212"
              >
              <div class="prd-info">
                <div class="info-content">
                  <div class="info-title">{{item.name}}</div>
                  <div class="info-detail">
                    <ul>
                      <li
                        class="info-sub"
                        v-for="(sub, index) in item.subs"
                        :key="index"
                      ><i
                          class="icon"
                          :class="sub.active ? 'icon-checked' : 'icon-no-checked'"
                        ></i>{{sub.name}}</li>
                    </ul>
                  </div>
                </div>
                <div>
                  <el-button type="primary">变更服务</el-button>
                  <el-button type="info">取消委托</el-button>
                </div>

              </div>
              <div class="check-wrap">
                <el-checkbox
                  :label="item.id"
                  :key="item.id"
                ></el-checkbox>
              </div>

            </div>
          </el-col>
        </el-checkbox-group>
      </el-row>

      <div
        class="noData"
        v-else
      >暂无数据</div>

    </div>
  </div>
</template>

<script>
import BlockHead from '@/components/BlockHead'

export default {
  components: {
    BlockHead
  },
  props: {},
  data() {
    return {
      prdList: [],
      checkedList: [],
      activeClass: null,
      classList: []
    }
  },
  mounted() {
    this.fetchClass()
  },
  methods: {
    // 获取分类
    fetchClass() {
      // ajax...
      this.classList = [
        {
          id: 1,
          name: '全部'
        },
        {
          id: 2,
          name: '总账'
        }
      ]
      this.activeClass = this.classList[0].id || null
    },
    fetchData(param) {
      // 获取产品列表...
      // fetch(param) ...
      this.prdList = [
        {
          name: '产品1',
          id: 1,
          subs: [
            {
              name: '总账入账审核',
              active: true
            },
            {
              name: '实物管理',
              active: true
            }
          ]
        },
        {
          name: '产品2',
          id: 2,
          subs: [
            {
              name: '总账入账审核',
              active: false
            },
            {
              name: '实物管理',
              active: true
            }
          ]
        }
      ]
      this.renderAllCheckItem()
    },
    renderAllCheckItem() {
      this.prdList.forEach(item => {
        let flag = this.checkStatus(item.subs)
        if (flag && !this.checkedList.includes(item.id)) {
          this.checkedList.push(item.id)
        }
      })
    },
    checkStatus(subs) {
      return subs.every(item => item.active)
    },
    clearData() {
      this.prdList = []
    },
    handleClassChange(id) {
      this.activeClass = id
      this.fetchData()
    },
    handleCheckedChange(val) {
      this.$emit('setPrdList', val)
      // this.checkedList = val
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
.class-wrap {
  padding: 30px 0;
}
.class-item {
  display: inline-block;
  padding: 8px 26px;
  margin-right: 20px;
  font-size: 14px;
  line-height: 1.5;
  border: 1px dotted #cccccc;
  border-radius: 18px;
  cursor: pointer;
  &.active {
    background-color: #f5a623;
    border-color: #f5a623;
    color: #fff;
  }
}
.cell-wrap {
  display: flex;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid rgba(204, 204, 204, 1);
  &.active {
    border: 1px solid rgba(255, 102, 0, 1);
    box-shadow: 0px 0px 8px 0px rgba(255, 102, 0, 0.3);
  }
  .prd-info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    flex: 1;
    padding-left: 20px;
    .info-content {
      flex: 1;
      .info-title {
        font-size: 24px;
        line-height: 1.3;
      }
      .info-detail {
        height: 140px;
        overflow: auto;
      }
      .info-sub {
        margin-top: 12px;
        font-size: 14px;
        .icon {
          display: inline-block;
          width: 16px;
          height: 16px;
          margin-right: 10px;
          background: no-repeat center;
          background-size: contain;
          vertical-align: bottom;
          &.icon-checked {
            background-image: url('../../../assets/images/tag_sel_service.png');
          }
          &.icon-no-checked {
            background-image: url('../../../assets/images/tag_unsel_service.png');
          }
        }
      }
    }
  }
  .check-wrap {
    /deep/ .el-checkbox__label {
      display: none;
    }
  }
}
.noData {
  font-size: 14px;
  line-height: 50px;
  color: #999;
  text-align: center;
}
</style>
