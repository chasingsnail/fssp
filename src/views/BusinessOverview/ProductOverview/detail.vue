<template>
  <div class="main-content page-wrap detail-wrap">
    <h3 class="title">产品全景图-委托与否-{{childNode}}</h3>
    <AttendBadge></AttendBadge>
    <div class="node-chart">
      <div
        class="row-item"
        v-for="(item, index) in subItems"
        :key="item.name"
      >
        <ChildNode
          :subInfo="item"
          :index="index"
          :active="item.parentId === currentId"
        />
      </div>
    </div>
  </div>
</template>

<script>
import AttendBadge from '../component/AttendBadge'
import ChildNode from './childNode'
export default {
  components: {
    AttendBadge,
    ChildNode
  },
  data() {
    return {
      subItems: [{}]
    }
  },
  computed: {
    parentNode() {
      return this.$route.query.parent
    },
    childNode() {
      return this.$route.query.extra
    }
  },
  methods: {},
  mounted() {}
}
</script>

<style scoped lang="scss">
.detail-wrap {
  padding: 50px 160px;
}
.title {
  margin: 0 0 30px;
  font-size: 24px;
  line-height: 1.5;
  text-align: center;
}
.node-chart {
  position: relative;
  .row-item {
    position: relative;
    display: inline-block;
    width: 50%;
    margin-bottom: 40px;
    &:nth-child(2n) {
      text-align: right;
    }
  }
}
</style>
