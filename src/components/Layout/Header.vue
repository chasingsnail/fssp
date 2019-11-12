<template>
  <div class="header-wrap">
    <header class="header-content main-content">
      <router-link
        class="home"
        :to="{ name: 'home' }"
      >首页</router-link>
      <div class="operate">
        <div class="user"><span class="highlight">蛇皮</span>，欢迎回来！</div>
        <div
          class="operate-item"
          @click="showNotice"
        >
          <i class="icon icon-notice"></i>
          <span>通知(<span class="highlight">{{msgNum}}</span>)</span>
        </div>
        <span class="spacer"></span>
        <div
          class="operate-item"
          @click="switchTheme"
        >
          <i class="icon icon-theme"></i>切换管理主题
        </div>
        <span class="spacer"></span>
        <div
          class="operate-item"
          @click="exit"
        >
          <i class="icon icon-exit"></i>退出
        </div>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      msgNum: 8
    }
  },
  mounted() {},
  methods: {
    showNotice() {
      // 点击重置为0
      this.msgNum = 0
    },
    switchTheme() {},
    exit() {}
  }
}
</script>

<style scoped lang="scss">
.header-wrap {
  background: rgba(245, 245, 245, 1);
  .header-content {
    height: 32px;
    line-height: 32px;
    color: #666;
    font-size: 14px;
    .home {
      color: #666;
    }
    .operate {
      float: right;
      display: flex;
      align-items: center;
      .awsui-iconfont {
        vertical-align: middle;
      }
      .highlight {
        color: #ff6600;
      }
      .user {
        margin-right: 20px;
      }
      .spacer {
        height: 12px;
        width: 1px;
        margin: 0 10px;
        background-color: #ccc;
      }
      .operate-item {
        display: inline-flex;
        align-items: center;
        cursor: pointer;
        &:hover {
          color: #ff6600;
        }
        .icon {
          display: inline-block;
          width: 14px;
          height: 14px;
          margin-right: 5px;
          background: no-repeat center;
          &.icon-notice {
            background-image: url('../../assets/images/icon_message@2x.png');
            background-size: 14px;
          }
          &.icon-theme {
            background-image: url('../../assets/images/icon_change_admin@2x.png');
            background-size: 14px;
          }
          &.icon-exit {
            background-image: url('../../assets/images/icon_exit@2x.png');
            background-size: 14px;
          }
        }
      }
    }
  }
}
</style>
