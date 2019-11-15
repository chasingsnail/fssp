<template>
  <div>
    <div class="collapse-wrap">
      <div
        class="index-block"
        :class="{active: !hide}"
      >{{index}}</div>
      <div
        class="content"
        :style="{ height: hide ? '21px' : calcHeight + 'px' }"
      >
        <p
          class="text"
          :class="{open: !hide}"
        >{{config.q}}</p>
        <p
          ref="answer"
          class="text answer"
        >{{config.a}}</p>
      </div>
      <div
        class="co-button"
        @click="collapse"
      >展开 <i :class="hide ? 'el-icon-caret-bottom' : 'el-icon-caret-top'"></i></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    index: Number,
    config: Object
  },
  data() {
    return {
      hide: true,
      calcHeight: 0
    }
  },
  computed: {},
  methods: {
    collapse() {
      this.calcHeight = this.$refs.answer.getClientRects()[0].height + 33
      this.hide = !this.hide
    }
  },
  mounted() {
    // this.$nextTick(_ => {
    //   this.calcHeight = this.$refs.answer.getClientRects()[0].height + 33
    // })
  }
}
</script>

<style scoped lang="scss">
.collapse-wrap {
  position: relative;
  padding: 20px 20px 20px 48px;
  display: flex;
  align-items: flex-start;
  margin-bottom: 14px;
  border: 1px solid rgba(221, 221, 221, 1);
  .index-block {
    position: absolute;
    left: -7px;
    top: 16px;
    width: 32px;
    height: 26px;
    color: #fff;
    font-size: 14px;
    text-align: center;
    line-height: 1.5;
    background: url('../../../assets/images/tag_question_unsel@2x.png')
      no-repeat center;
    background-size: contain;
    &.active {
      background-image: url('../../../assets/images/tag_question_sel@2x.png');
    }
  }
  .co-button {
    height: 30px;
    padding: 0 10px;
    margin-left: 20px;
    background: rgba(245, 166, 35, 0.2);
    border-radius: 2px;
    text-align: center;
    font-size: 14px;
    color: #ff6600;
    line-height: 30px;
    cursor: pointer;
  }
  .content {
    flex: 1;
    overflow: hidden;
    transition: height 0.3s;
  }
  .text {
    font-size: 14px;
    line-height: 1.5;
    &.open {
      color: #ff6600;
    }
  }
  .answer {
    margin-top: 12px;
    color: #4a90e2;
  }
}
</style>
