<template>
  <div class="footer">
    <div class="footer-conten">
      <ul
        class="link-wrap"
        v-for="(links, index) in linkList"
        :key="index"
      >
        <li
          class="link"
          v-for="(link, lIndex) in links"
          :key="lIndex"
        >
          <a :href="link.link">{{link.text}}</a>
        </li>
      </ul>
      <div class="logo-block">
        <img src="../../assets/images/logo_bottom.png">
        <div class="tel">服务热线：1492852855</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      linkList: [
        [
          {
            text: '关于象融',
            link: '//baidu'
          },
          {
            text: '企业文化',
            link: '//baidu'
          },
          {
            text: '公司荣誉',
            link: '//baidu'
          },
          {
            text: '发展历程',
            link: '//baidu'
          }
        ],
        [
          {
            text: '帮助中心',
            link: '//baidu'
          },
          {
            text: '隐私保密声明',
            link: '//baidu'
          },
          {
            text: '网站声明',
            link: '//baidu'
          },
          {
            text: '网站地图',
            link: '//baidu'
          },
          {
            text: '财务共享管理办法',
            link: '//baidu'
          }
        ],
        [
          {
            text: '投资者关系',
            link: '//baidu'
          },
          {
            text: '企业招聘',
            link: '//baidu'
          },
          {
            text: '联系我们',
            link: '//baidu'
          }
        ]
      ]
    }
  },
  computed: {},
  methods: {},
  mounted() {}
}
</script>

<style scoped lang="scss">
.footer {
  height: 289px;
  background: rgba(245, 245, 245, 1);
  .footer-conten {
    display: flex;
    width: 1200px;
    margin: 0 auto;
    padding-top: 50px;
    .link-wrap {
      width: 250px;
      .link {
        margin-bottom: 10px;
        a {
          font-size: 12px;
          line-height: 1.5;
          color: #666;
        }
      }
    }
    .logo-block {
      flex: 1;
      padding-left: 90px;
      .tel {
        margin-top: 10px;
        color: #666;
        font-size: 18px;
      }
    }
  }
}
</style>
