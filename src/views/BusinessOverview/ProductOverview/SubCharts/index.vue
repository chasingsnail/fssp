<template>
  <div class="chart-content">
    <div
      class="row-item"
      v-for="(item, index) in subItems"
      :key="item.name"
    >
      <SubItem
        :subInfo="item"
        :index="index"
        :active="!!item.status"
      />
    </div>
    <div class="head-item active">
      {{headItem.name}}
      <div class="parent-node head-item">{{parentNode}}<i class="icon-arrow"></i></div>
    </div>
  </div>
</template>

<script>
import SubItem from './SubItem'
// import { prdData } from '@/mockData'
export default {
  components: {
    SubItem
  },
  data() {
    return {
      currentId: null,
      headItem: {},
      subItems: []
    }
  },
  computed: {
    parentNode() {
      return this.$route.query.parent
    }
  },
  methods: {
    setTransform(index) {
      return index % 2 === 0 ? 'scaleToLeft' : 'scaleToRight'
    },
    calcMainPos(index) {
      return 48 + 110 * index
    },
    fetchData() {
      let mainPosMap = {}
      // 模拟数据
      const data = {
        code: '10',
        name: '总账记账1',
        percent: 100,
        services: [
          {
            code: '101',
            name: '服务1',
            status: 0
          },
          {
            code: '102',
            name: '服务2',
            status: 1
          },
          {
            code: '103',
            name: '服务3',
            status: 0
          },
          {
            code: '104',
            name: '服务4',
            status: 1
          }
        ]
      }
      this.headItem = data
      const rowNum = Math.ceil(data.services.length / 2)
      const mainPos = (rowNum * 88) / 2
      this.subItems = data.services.map((item, index) => {
        let plus = index % 2 === 0 ? 0 : -1
        let sideIndex = (index + plus) / 2
        let centerPos = sideIndex * 88 + 44
        item.endY = mainPos - centerPos
        return item
      })
      // data.services.forEach((item, index) => {
      //   mainPosMap[item.code] = index
      //   let _arr = item.products.map(subItem => {
      //     subItem.parentId = item.lineCode
      //     subItem.parentName = item.lineName
      //     return subItem
      //   })
      //   this.subItems = [...this.subItems, ..._arr]
      // })
      // this.processLinePos(mainPosMap)
    },
    processLinePos(posMap) {
      this.subItems.forEach((item, index) => {
        let plus = index % 2 === 0 ? 0 : -1
        const sideIndex = (index + plus) / 2
        let subCenterPos = sideIndex * 88 + 24
        let mainCenterPos = this.calcMainPos(posMap[item.parentId]) + 30
        item.endY = mainCenterPos - subCenterPos
      })
    }
  },
  mounted() {
    this.fetchData()
  }
}
</script>

<style scoped lang="scss">
.chart-content {
  position: relative;
  .row-item {
    position: relative;
    display: inline-block;
    width: 50%;
    margin: 20px 0;
    &:nth-child(2n) {
      text-align: right;
    }
  }
  .head-item {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 174px;
    height: 56px;
    line-height: 56px;
    font-size: 24px;
    color: #409ff5;
    text-align: center;
    background: url('../../../../assets/images/tag_service_unsel@2x.png')
      no-repeat center;
    background-size: contain;
    z-index: 10;
    cursor: pointer;
    &.active {
      color: #fff;
      background: url('../../../../assets/images/tag_service_sel@2x.png')
        no-repeat center;
      background-size: contain;
    }
  }
  .parent-node {
    position: absolute;
    top: -130px;
    left: 87px;
    .icon-arrow {
      position: absolute;
      top: 56px;
      left: 83px;
      width: 3px;
      height: 64px;
      background-color: #ccc;
      &::after {
        position: absolute;
        content: '';
        bottom: -25px;
        left: -12px;
        width: 26px;
        height: 26px;
        background: url('../../../../assets/images/prd-arrow.png') no-repeat
          center;
        transform: rotate(180deg);
      }
    }
  }
}
</style>
