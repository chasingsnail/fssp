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
  }
]
