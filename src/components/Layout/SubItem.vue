<template>
  <div class="sub-wrap">
    <div
      class="sub-item"
      v-for="(item, index) in subRoutes"
      :key="index"
    >
      <a
        v-if="item.isOutLink"
        :href="item.outUrl"
        target="_blank"
      ><i class="icon icon-outlink"></i>{{item.text}}</a>
      <router-link
        v-else
        :to="{name: item.name}"
      ><i
          class="icon"
          :class="'icon-' + item.name"
        ></i>{{item.meta.routeName}}</router-link>
      <template>

      </template>
    </div>
    <!-- <div class="sub-item"><i class="awsui-iconfont">&#58914;</i>产品全景图</div>
    <div class="sub-item"><i class="awsui-iconfont">&#58914;</i>白名单全景图</div>
    <div class="sub-item"><i class="awsui-iconfont">&#58914;</i>公司全景图</div>
    <div class="sub-item"><i class="awsui-iconfont">&#58914;</i>委托查询及处理</div> -->
  </div>
</template>

<script>
export default {
  props: {
    subRoutes: Array
  },
  data() {
    return {}
  },
  mounted() {},
  methods: {}
}
</script>

<style scoped lang="scss">
.sub-wrap {
  position: absolute;
  top: 54px;
  left: -80px;
  display: flex;
  white-space: nowrap;
  background: rgba(0, 0, 0, 0.6);
  box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.5);
  display: none;
  z-index: 100;
  .sub-item {
    display: inline-flex;
    align-items: center;
    height: 96px;
    padding: 0 30px;
    white-space: nowrap;
    color: #fff;
    .icon {
      display: inline-block;
      width: 32px;
      height: 32px;
      margin-right: 14px;
      vertical-align: middle;
      background: no-repeat center;
      background-size: 32px;
      &.icon-productOverview {
        background-image: url('../../assets/images/nav_productpic@2x.png');
      }
      &.icon-whiteList {
        background-image: url('../../assets/images/nav_whitelist_pic@2x.png');
      }
      &.icon-companyOverview {
        background-image: url('../../assets/images/nav_companypic@2x.png');
      }
      &.icon-outlink {
        background-image: url('../../assets/images/nav_outlink.png');
      }
      &.icon-commissionDeal {
        background-image: url('../../assets/images/nav_entrust_check@2x.png');
      }
      &.icon-attendAdd {
        background-image: url('../../assets/images/nav_entrust_add@2x.png');
      }
      &.icon-addtendEdit {
        background-image: url('../../assets/images/nav_entrust_alter@2x.png');
      }
    }

    a {
      color: #fff;
      font-size: 24px;
      &:hover,
      &.router-link-active {
        color: #f5a623;
        .icon-productOverview {
          background-image: url('../../assets/images/nav_productpic_pre@2x.png');
        }
        .icon-whiteList {
          background-image: url('../../assets/images/nav_whitelist_pic_pre@2x.png');
        }
        .icon-companyOverview {
          background-image: url('../../assets/images/nav_companypic_pre@2x.png');
        }
        .icon-outlink {
          background-image: url('../../assets/images/nav_outlink_pre.png');
        }
        .icon-commissionDeal {
          background-image: url('../../assets/images/nav_entrust_check_pre@2x.png');
        }
        .icon-attendAdd {
          background-image: url('../../assets/images/nav_entrust_add_pre@2x.png');
        }
        .icon-addtendEdit {
          background-image: url('../../assets/images/nav_entrust_alter_pre@2x.png');
        }
      }
    }
  }
}
</style>
