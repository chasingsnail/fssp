<template>
  <div class="list-wrap">
    <div
      class="white-list"
      v-for="item in list"
      :key="item.id"
    >
      <div class="title">{{item.name}}</div>
      <div class="subs-list">
        <el-row :gutter="40">
          <el-col
            :span="8"
            v-for="sub in item.subs"
            :key="sub.id"
          >
            <div
              class="sub-item"
              :class="{active: sub.active}"
            >
              <i
                class="icon"
                :class="sub.active ? 'icon-attend' : 'icon-no-attend'"
              ></i>
              {{sub.name}}
            </div>
          </el-col>
        </el-row>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: _ => []
    }
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
.white-list {
  display: flex;
  align-items: center;
  padding: 0 40px;
  & + .white-list {
    border-top: 1px dashed #cccccc;
  }
  .title {
    width: 60px;
    padding: 36px 18px;
    margin: 40px 0;
    line-height: 33px;
    text-align: center;
    background-color: #f5a623;
    color: #fff;
    font-size: 24px;
    border-radius: 8px;
  }
  .subs-list {
    flex: 1;
    margin-left: 40px;
    .sub-item {
      display: inline-block;
      width: 100%;
      height: 42px;
      line-height: 42px;
      margin: 20px;
      padding: 0 15px;
      border-radius: 4px;
      border: 1px dashed rgba(204, 204, 204, 1);
      &.active {
        border: 1px solid rgba(245, 166, 35, 1);
      }
      .icon {
        margin-right: 2px;
        vertical-align: text-bottom;
      }
    }
  }
}
</style>
