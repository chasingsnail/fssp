<template>
  <div class="nav-wrap">
    <div class="nav-list main-content">
      <div
        class="head-nav"
        :class="{active: headRoute.name === item.name}"
        v-for="(item, index) in routerLinks"
        :key="index"
      >
        <a
          v-if="item.isOutLink"
          class="outlink"
          target="_blank"
          :href="item.outUrl"
        >{{item.text}}</a>
        <router-link
          v-else-if="item.meta.single"
          :to="{name: item.name}"
        >{{item.meta.routeName}}</router-link>
        <template v-else>
          {{item.meta.routeName}}
          <SubItem :subRoutes="filterRoute(item.children)" />
        </template>

      </div>
      <!-- <div class="head-nav active">首页</div>
      <div class="head-nav">
        业务全景图
        <SubItem />
      </div>
      <div class="head-nav">
        业务办理
        <SubItem />
      </div>
      <div class="head-nav">购物车</div>
      <div class="head-nav">关于我们</div> -->
    </div>
  </div>
</template>

<script>
import SubItem from './SubItem'
import { mapState } from 'vuex'
export default {
  props: {},
  components: {
    SubItem
  },
  computed: {
    ...mapState(['routerLinks']),
    headRoute() {
      return this.$route.matched[0]
    }
  },
  data() {
    return {}
  },
  mounted() {
    console.log(this.$route.matched)
  },
  methods: {
    filterRoute(arr) {
      // 隐藏不需要展示路由
      let result = []
      arr.forEach(item => {
        if (!item.meta || (item.meta && !item.meta.hideGuide)) {
          result.push(item)
        }
      })
      return result
    }
  }
}
</script>

<style scoped lang="scss">
.nav-wrap {
  background-color: #f9f9f9;
  .nav-list {
    display: flex;
    height: 54px;
    line-height: 54px;
    font-size: 24px;
    color: #333;
    .head-nav {
      position: relative;
      height: 54px;
      margin-right: 50px;
      cursor: pointer;
      a {
        color: #333;
      }
      .router-link-active {
        color: #ff6600;
      }
      &.active {
        color: #ff6600;
        &::after {
          position: absolute;
          left: 50%;
          bottom: 0;
          content: '';
          width: 28px;
          height: 2px;
          transform: translateX(-50%);
          background-color: #ff6600;
        }
      }
      &:hover {
        /deep/ .sub-wrap {
          display: block;
        }
      }
    }
  }
}
</style>
