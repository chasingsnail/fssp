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
                <el-button
                  type="primary"
                  @click="handleToDetail(item)"
                >定制服务</el-button>
              </div>
              <div class="check-wrap">
                <el-checkbox
                  :label="item.id"
                  :key="item.id"
                  @change="handleChangeSubStatus($event, item.id)"
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

      <div class="company-link">
        <el-link type="success">查看已委托产品>></el-link>
      </div>
    </div>
  </div>
</template>

<script>
import BlockHead from '@/components/BlockHead'
import { setStorage, getStorage } from '@/utils/storage'

export default {
  components: {
    BlockHead
  },
  data() {
    return {
      checkedList: [],
      prdList: [],
      activeClass: 1,
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
      this.activeClass = this.classList[0].id
      this.fetchData()
    },
    reRender() {
      const _data = getStorage('checkService')
      if (!_data) return
      const _index = this.prdList.findIndex(item => item.id === _data.id)
      this.$set(this.prdList, _index, _data)
      // 维护全选关系
      let checkAll = _data.subs.every(item => item.active)
      const sideIndex = this.checkedList.findIndex(id => id === _data.id)
      if (checkAll && sideIndex === -1) {
        this.checkedList.push(_data.id)
      } else if (!checkAll && sideIndex !== -1) {
        this.checkStatus.splice(sideIndex, 1)
      }
    },
    handleToDetail(item) {
      setStorage('checkService', item)
      this.$router.push({ name: 'serviceDetail' })
    },
    fetchData() {
      const params = {
        id: this.activeClass
      }
      console.log(params)
      // 获取分类与产品列表...
      this.prdList = [
        {
          name: '产品1',
          id: 1,
          subs: [
            {
              id: 12,
              name: '总账入账审核',
              active: false
            },
            {
              id: 13,
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
              id: 14,
              name: '总账入账审核',
              active: true
            },
            {
              id: 15,
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
    // 全选按钮事件
    handleChangeSubStatus(flag, id) {
      const _index = this.prdList.findIndex(item => item.id === id)
      this.prdList[_index].subs.forEach(item => {
        item.active = flag
      })
    },
    checkStatus(subs) {
      return subs.every(item => item.active)
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
