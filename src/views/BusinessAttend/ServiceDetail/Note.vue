<template>
  <div>
    <div class="text-section">
      <div class="section-title bold">一、为保证集中运营的可持续性和发展性，业务的新增变更取消评估将遵循以下原则进行：</div>
      <div class="section-para">
        <p>（一）规范性原则：作业流程需符合外部监管和集团管理要求，合作双方应就委托业务流程进行充分沟通并达成一致。共享作业后减少不合规操作。</p>
        <p>（二）可操作性原则：作业规则需可落地实施，具有可操作性。</p>
        <p>（三）风险可控原则：作业流程、规则、系统控制需风险可控，共享作业后流程得到可视化提升，减少人工手工操作。</p>
        <p>（四）成本改善原则：端到端作业可达到成本改善的最终目标，共享作业后体现规模优势和集中价值。</p>
        <p>（五）稳健型原则：流程方案充分沟通、培训到位。事前工作准备有序，需满足业务可平稳过渡承接，达到业务品质及时效要求，<span class="highlight">原则上每年11月1日-12月31日不进行新业务委托及规则变更</span>，以业务落地时间为戳点。</p>
        <br>
        <p class="bold">以影响专业公司日常经营为原则，中心经评估可以按照特殊情况变更的情况包括：</p>
        <p>(1) 公司名称变更；</p>
        <p>(2) 外部监管要求；</p>
        <p>(3) 国家重大政策调整或变更，影响到目前审核规则的；</p>
        <p>其他特殊情况由委托方报集团同意后，中心再做变更评估。</p>
      </div>
    </div>
    <div class="text-section">
      <div class="section-title bold">一、计费模式：</div>
      <div class="section-para">
        <p class="highlight">单价服务：</p>
        <p>以业务量为驱动因素，在五福单价不变的基础上，总体服务价格随着业务量的变化而同步变化。</p>
        <p>因委托流程和内容变更导致中心服务耗时变更，根据影响程度会同步带动服务单价的变化。</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {}
  },
  computed: {},
  methods: {},
  mounted() {}
}
</script>

<style scoped lang="scss">
.text-section {
  padding: 30px 0;
  & + .text-section {
    border-top: 1px dashed #cccccc;
  }
  .bold {
    color: #333;
    font-weight: bold;
  }
  .section-title {
    margin-bottom: 12px;
    font-size: 16px;
    line-height: 1.5;
  }
  .section-para {
    line-height: 1.5;
    p {
      text-indent: 28px;
    }
    .highlight {
      color: #ff6600;
    }
  }
}
</style>
