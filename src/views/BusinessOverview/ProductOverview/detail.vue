<template>
  <div class="main-content page-wrap detail-wrap">
    <h3 class="title">产品全景图-委托与否-{{childNode}}</h3>
    <AttendBadge></AttendBadge>
    <div class="prd-chart">
      <SubCharts />
    </div>
    <div class="button-block">
      <el-button
        type="primary"
        @click="goBack"
      >返回</el-button>
    </div>
  </div>
</template>

<script>
import AttendBadge from '../component/AttendBadge'
import SubCharts from './SubCharts'
export default {
  name: 'productDetail',
  components: {
    AttendBadge,
    SubCharts
  },
  data() {
    return {}
  },
  computed: {
    childNode() {
      return this.$route.query.extra
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    }
  },
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
.prd-chart {
  padding: 128px 0 74px;
}
.button-block {
  margin-top: 100px;
  text-align: center;
}
</style>
