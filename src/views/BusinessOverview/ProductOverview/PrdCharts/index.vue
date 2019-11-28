<template>
  <div
    ref="chartWrap"
    class="chart-content"
    :style="{minHeight: calcHeight + 'px'}"
  >
    <div
      class="row-item"
      v-for="(item, index) in subItems"
      :key="item.name"
    >
      <SubItem
        :subInfo="item"
        :index="index"
        :active="item.parentId === currentId"
      />
    </div>
    <div
      class="head-item"
      v-for="(item, index) in headItems"
      :key="item.lineCode"
      :class="{active: currentId === item.lineCode}"
      :style="{ top: calcMainPos(index) + 'px'}"
      @click="currentId = item.lineCode"
    >
      {{item.lineName}}
    </div>
    <i class="bg-arrow"></i>
  </div>
</template>

<script>
import SubItem from './SubItem'
import { prdData } from '@/mockData'
export default {
  components: {
    SubItem
  },
  data() {
    return {
      currentId: null,
      headItems: [],
      subItems: [],
      calcHeight: 200,
      realHeight: 0,
      topGap: 50
    }
  },
  methods: {
    setTransform(index) {
      return index % 2 === 0 ? 'scaleToLeft' : 'scaleToRight'
    },
    calcMainPos(index) {
      return 48 + this.topGap * index + index * 56
    },
    fetchData() {
      let mainPosMap = {}
      const data = prdData
      this.headItems = data
      data.forEach((item, index) => {
        mainPosMap[item.lineCode] = index
        let _arr = item.products.map(subItem => {
          subItem.parentId = item.lineCode
          subItem.parentName = item.lineName
          return subItem
        })
        this.subItems = [...this.subItems, ..._arr]
      })
      let lastTop = this.calcMainPos(this.headItems.length - 1)
      this.calcHeight = lastTop + 56 + 40
      this.$nextTick(_ => {
        this.realHeight = this.$refs.chartWrap.getBoundingClientRect().height
        if (this.realHeight > this.calcHeight) {
          const count = this.headItems.length
          this.topGap = (this.realHeight - 40 - count * 56) / (count - 1)
        }
        lastTop = this.calcMainPos(this.headItems.length - 1)
        this.calcHeight = lastTop + 56 + 40
        this.processLinePos(mainPosMap)
      })
    },
    processLinePos(posMap) {
      this.subItems.forEach((item, index) => {
        let plus = index % 2 === 0 ? 0 : -1
        const sideIndex = (index + plus) / 2
        let subCenterPos = sideIndex * 88 + 24
        let mainCenterPos = this.calcMainPos(posMap[item.parentId]) + 30
        item.endY = mainCenterPos - subCenterPos + 24
      })
    }
  },
  mounted() {
    this.fetchData()
  }
}
</script>

<style scoped lang="scss">
.white-list {
  display: flex;
  align-items: center;
  .title {
    width: 60px;
    padding: 36px 0;
    text-align: center;
    background-color: #f5a623;
    color: #fff;
  }
  .subs-list {
    flex: 1;
    .sub-item {
      display: inline-block;
      width: 100px;
      margin: 10px;
    }
  }
}
.chart-content {
  position: relative;
  .bg-arrow {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 3px;
    top: -2px;
    bottom: -2px;
    background-color: #ccc;
    z-index: 1;
    &::before {
      position: absolute;
      content: '';
      top: -25px;
      left: -11px;
      width: 26px;
      height: 26px;
      background: url('../../../../assets/images/prd-arrow.png') no-repeat
        center;
    }
  }
  .row-item {
    position: relative;
    display: inline-block;
    width: 50%;
    margin-bottom: 40px;
    &:nth-child(2n) {
      text-align: right;
    }
  }
  .head-item {
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);
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
}
</style>
