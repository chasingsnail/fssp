<template>
  <div class="head-wrap">
    <div class="head">
      <div class="icon-wrap">
        <div class="icon-circle">
          <i
            class="icon"
            :class="'icon-' + icon"
          ></i>
        </div>
      </div>
      <h5 class="title">{{title}}</h5>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    icon: String
  }
}
</script>

<style scoped lang="scss">
.head-wrap {
  margin-top: 20px;
  padding: 0 20px;
  border-bottom: 1px solid #ddd;
  .head {
    display: inline-flex;
    align-items: center;
    width: 200px;
    height: 52px;
    border: 1px solid #f5a623;
    border-bottom: none;
    vertical-align: bottom;
    .icon-wrap {
      display: inline-block;
      width: 54px;
      height: 100%;
      line-height: 1;
      background-color: #ff6600;
      text-align: center;
      border-radius: 0 26px 26px 0;
      .icon-circle {
        display: inline-block;
        width: 40px;
        height: 40px;
        margin-top: 5px;
        background-color: #fff;
        border-radius: 50%;
        .icon {
          display: inline-block;
          width: 100%;
          height: 100%;
          background: no-repeat center;
          background-size: 35px;
          &.icon-company {
            background-image: url('../assets/images/pic_entrust_company@2x.png');
          }
          &.icon-prd {
            background-image: url('../assets/images/pic_entrust_product@2x.png');
          }
        }
        // background: no-repeat center;
      }
    }
    .title {
      margin-left: 6px;
      line-height: 52px;
      font-size: 18px;
      font-weight: 700;
      color: #ff6600;
    }
  }
}
</style>
