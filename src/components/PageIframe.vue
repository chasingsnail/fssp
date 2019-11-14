<template>
  <div class="main-content iframe-wrap">
    <iframe
      id="iframe"
      :src="$route.meta.url"
      width="100%"
    ></iframe>
  </div>
</template>

<script>
// import resizer from 'iframe-resizer'
export default {
  props: {},
  data() {
    return {}
  },
  mounted() {
    this.$nextTick(_ => {
      this.calcHeight()
    })
  },
  methods: {
    calcHeight() {
      // resizer.iframeResizer({ log: true }, '#cIframe')
      // const iframe = this.$refs.iframe
      // var iframeWin =
      //   iframe.contentWindow || iframe.contentDocument.parentWindow
      // if (iframeWin.document.body) {
      //   iframe.height =
      //     iframeWin.document.documentElement.scrollHeight ||
      //     iframeWin.document.body.scrollHeight
      // }
    }
  }
}
</script>

<style scoped lang="scss">
.iframe-wrap {
  margin-top: 20px;
  background-color: #fff;
  #iframe {
    min-height: 600px;
  }
}
</style>
