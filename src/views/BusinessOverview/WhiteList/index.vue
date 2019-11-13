<template>
  <div class="main-content page-wrap">
    <DataDesc>
      财务服务中心提供8大项产品线，<span class="highlight">53</span>项白名单服务。其中集团稽核已委托<span class="highlight">4</span>项服务，覆盖率<span class="highlight">8%</span>。
    </DataDesc>

    <div class="filter-bar">
      <div class="filter-item">
        <label class="label">账单主题</label>
        <el-select
          v-model="account"
          placeholder="请选择"
        >
          <el-option
            v-for="item in accountOpt"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>

      <div class="filter-item">
        <label class="label">委托模式</label>
        <el-select
          v-model="mode"
          placeholder="请选择"
        >
          <el-option
            v-for="item in modeOpt"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>

      <div class="filter-item">
        <label class="label">资金属性</label>
        <el-select
          v-model="attr"
          placeholder="请选择"
        >
          <el-option
            v-for="item in attrOpt"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>

      <div class="filter-item">
        <el-button type="primary">查询</el-button>
      </div>

      <div class="operate-item">
        <el-button><i class="el-icon-download"></i>导出已委托产品</el-button>
      </div>
    </div>

    <div class="content">
      <h3 class="title">产品全景图-白名单</h3>

      <AttendBadge />

      <WhiteList :list="whiteList" />
    </div>

  </div>
</template>

<script>
import DataDesc from '@/components/DataDesc'
import AttendBadge from '../component/AttendBadge'
import WhiteList from './list'
export default {
  components: {
    DataDesc,
    AttendBadge,
    WhiteList
  },
  data() {
    return {
      account: 1,
      mode: 1,
      attr: 1,
      accountOpt: [
        {
          value: 1,
          label: '集团稽核'
        },
        {
          value: 2,
          label: '实体机构'
        }
      ],
      modeOpt: [
        {
          value: 1,
          label: '实体机构'
        }
      ],
      attrOpt: [
        {
          value: 1,
          label: '自有'
        }
      ],
      whiteList: [
        {
          id: 1,
          name: '总账',
          subs: [
            {
              id: 2,
              name: '总账1',
              active: true
            },
            {
              id: 3,
              name: '总账1'
            },
            {
              id: 4,
              name: '总账1',
              active: true
            },
            {
              id: 5,
              name: '总账1'
            }
          ]
        },
        {
          id: 2,
          name: '费用',
          subs: [
            {
              id: 2,
              name: '总账2'
            },
            {
              id: 3,
              name: '总账1'
            },
            {
              id: 4,
              name: '总账1'
            },
            {
              id: 5,
              name: '总账1'
            }
          ]
        }
      ]
    }
  },
  computed: {},
  methods: {},
  mounted() {}
}
</script>
<style scoped lang="scss">
.filter-bar {
  padding: 20px;
  border-bottom: 1px solid #dddddd;
  .filter-item {
    display: inline-block;
    margin-right: 40px;
  }
  .operate-item {
    float: right;
  }
  .label {
    margin-right: 8px;
    font-size: 14px;
    color: #333333;
  }
  /deep/ .el-select {
    width: 160px;
  }
}
.content {
  width: 1000px;
  margin: 0 auto;
  padding: 30px 0;
  .title {
    font-size: 24px;
    margin-bottom: 20px;
    line-height: 1.6;
    color: #262729;
    text-align: center;
  }
}
</style>
