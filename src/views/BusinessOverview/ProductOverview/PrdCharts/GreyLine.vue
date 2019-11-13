<template>
  <svg
    class="line"
    :class="{left: !isRight, right: isRight}"
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
  >
    <line
      :x1="startX"
      y1="0"
      :x2="endX"
      :y2="endPos"
      :stroke="lineColor"
      stroke-width="1"
      stroke-dasharray="5,5"
    ></line>
  </svg>
</template>

<script>
export default {
  props: {
    index: {
      type: Number
    },
    endPos: Number,
    active: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  computed: {
    isRight() {
      return this.index % 2 !== 0
    },
    startX() {
      return this.isRight ? 300 : 0
    },
    endX() {
      return this.isRight ? 130 : 170
    },
    lineColor() {
      return this.active ? '#AAA' : 'transparent'
    }
  },
  methods: {},
  mounted() {}
}
</script>

<style scoped lang="scss">
.line {
  position: absolute;
  top: 24px;
  // left: 0;
  overflow: visible;
  &.left {
    left: 200px;
  }
  &.right {
    right: 200px;
  }
}
</style>
