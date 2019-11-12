<template>
  <div class="head-wrap">
    <div class="inner">
      <span class="sub-line"></span>
      <div class="text-wrap">
        <div class="title">{{title}}</div>
        <div class="sub-title">{{subTitle}}</div>
      </div>
      <span class="sub-line"></span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    subTitle: String
  },
  data() {
    return {}
  },
  computed: {},
  methods: {},
  mounted() {}
}
</script>

<style scoped lang="scss">
.head-wrap {
  text-align: center;
  .inner {
    display: inline-flex;
    align-items: center;
    .sub-line {
      width: 200px;
      height: 1px;
      background-color: #cccccc;
    }
    .text-wrap {
      margin: 0 6px;
      .title {
        color: #ff6600;
        font-size: 30px;
        font-weight: bold;
      }
      .sub-title {
        color: rgba(255, 102, 0, 0.5);
        margin-top: 8px;
        font-size: 20px;
        font-weight: lighter;
      }
    }
  }
}
</style>
