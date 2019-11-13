export const mockRoutes = [
  // 首页
  {
    name: 'home'
  },
  // 业务全景图
  {
    name: 'businessOverview',
    children: [
      {
        name: 'productOverview' // 产品全景图
      },
      {
        name: 'whiteList' // 白名单全景图
      },
      {
        name: 'companyOverview' // 公司全景图
      },
      {
        name: 'commissionDeal' // 委托查询及处理
      },
      {
        isOutLink: true,
        text: '百度',
        outUrl: '//www.baidu.com'
      }
    ]
  },
  // 业务办理
  {
    name: 'businessAttend',
    children: [
      {
        name: 'attendAdd' // 新增委托
      },
      {
        name: 'addtendEdit' // 变更委托
      }
    ]
  },
  // 购物车
  {
    name: 'shoppingCart'
  },
  {
    isOutLink: true,
    text: '关于我们',
    outUrl: '//www.baidu.com'
  },
  {
    isOutLink: true,
    inner: true,
    text: '本页打开',
    outUrl: '//www.baidu.com'
  }
]

export const prdData = [
  {
    lineCode: 1,
    lineName: '总账',
    products: [
      {
        code: '10',
        name: '总账记账1',
        percent: 100,
        services: [
          {
            code: '101',
            name: '服务1',
            status: 0
          },
          {
            code: '102',
            name: '服务2',
            status: 1
          }
        ]
      },
      {
        code: '11',
        name: '总账记账2',
        percent: 0,
        services: [
          {
            code: '111',
            name: '服务1',
            status: 0
          },
          {
            code: '112',
            name: '服务2',
            status: 0
          }
        ]
      }
    ]
  },
  {
    lineCode: 2,
    lineName: '核算',
    products: [
      {
        code: '12',
        name: '核算1',
        percent: 100,
        services: [
          {
            code: '101',
            name: '服务1',
            status: 0
          },
          {
            code: '102',
            name: '服务2',
            status: 1
          }
        ]
      },
      {
        code: '13',
        name: '核算2',
        percent: 0,
        services: [
          {
            code: '111',
            name: '服务1',
            status: 0
          },
          {
            code: '112',
            name: '服务2',
            status: 0
          }
        ]
      },
      {
        code: '14',
        name: '核算3',
        percent: 0,
        services: [
          {
            code: '111',
            name: '服务1',
            status: 0
          },
          {
            code: '112',
            name: '服务2',
            status: 0
          }
        ]
      }
    ]
  }
]
