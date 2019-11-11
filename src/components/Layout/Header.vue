<template>
  <div class="header-wrap">
    <header class="header-content main-content">
      <router-link class="home" :to="{ name: 'home' }">首页</router-link>
      <div class="operate">
        <div class="user"><span class="highlight">蛇皮</span>，欢迎回来！</div>
        <div class="operate-item" @click="showNotice">
          <i class="icon icon-notice"></i>通知(<span class="highlight">8</span>)
        </div>
        <span class="spacer"></span>
        <div class="operate-item" @click="switchTheme">
          <i class="icon icon-theme"></i>切换管理主题
        </div>
        <span class="spacer"></span>
        <div class="operate-item" @click="exit">
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
    return {}
  },
  mounted() {},
  methods: {
    showNotice() {},
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
      .highlight {
        color: #FF6600;
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
        cursor: pointer;
      }
    }
  }
}
</style>
