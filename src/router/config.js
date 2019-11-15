import Layout from '@/components/Layout'
import PageLayout from '@/components/PageLayout'

// const routes = [
//   {
//     path: '/',
//     name: 'base',
//     redirect: '/home'
//   },
//   // 首页
//   {
//     path: '/home',
//     name: 'home',
//     redirect: '/home/homePage',
//     component: Layout,
//     children: [
//       {
//         path: 'homePage',
//         name: 'homePage',
//         component: () =>
//           import(/* webpackChunkName: "about" */ '../views/Home.vue'),
//         meta: {
//           hideGuide: true
//         }
//       }
//     ]
//   },
//   // 业务全景图
//   {
//     path: '/businessOverview',
//     name: 'businessOverview',
//     component: Layout,
//     meta: {
//       routeName: '业务全景图'
//     },
//     children: [
//       // 产品全景图
//       {
//         path: 'productOverview',
//         name: 'productOverview',
//         component: PageLayout,
//         children: [
//           {
//             path: 'serviceList',
//             name: 'serviceList',
//             component: () =>
//               import(
//                 /* webpackChunkName: "commissionDeal" */ '../views/BusinessOverview/CommissionDeal'
//               ),
//             meta: {
//               routeName: '委托与否'
//             }
//           },
//           {
//             path: 'commissionDetail',
//             name: 'commissionDetail',
//             component: () =>
//               import(
//                 /* webpackChunkName: "commissionDeal" */ '../views/BusinessOverview/CommissionDeal/detail.vue'
//               )
//           }
//         ],
//         meta: {
//           routeName: '产品全景图'
//         }
//       },
//       // 白名单全景图
//       {
//         path: 'whiteList',
//         name: 'whiteList',
//         component: () =>
//           import(
//             /* webpackChunkName: "whiteList" */ '../views/BusinessOverview/WhiteList'
//           ),
//         meta: {
//           routeName: '白名单'
//         }
//       },
//       // 公司全景图
//       {
//         path: 'companyOverview',
//         name: 'companyOverview',
//         component: () =>
//           import(
//             /* webpackChunkName: "companyOverview" */ '../views/BusinessOverview/CompanyOverview'
//           ),
//         meta: {
//           routeName: '公司全景图'
//         }
//       },
//       // 委托查询及处理
//       {
//         path: 'commissionDeal',
//         name: 'commissionDeal',
//         component: PageLayout,
//         meta: {
//           routeName: '委托与否'
//         }
//       }
//     ]
//   },
//   // 业务办理
//   {
//     path: '/businessAttend',
//     name: 'businessAttend',
//     component: Layout,
//     meta: {
//       routeName: '业务办理'
//     },
//     children: [
//       {
//         path: 'add',
//         name: 'attendAdd',
//         component: () =>
//           import(
//             /* webpackChunkName: "attendAdd" */ '../views/BusinessAttend/AttendAdd'
//           ),
//         meta: {
//           routeName: '新增委托'
//         }
//       },
//       {
//         path: 'edit',
//         name: 'addtendEdit',
//         component: () =>
//           import(
//             /* webpackChunkName: "attendEdit" */ '../views/BusinessAttend/AttendEdit'
//           ),
//         meta: {
//           routeName: '变更委托'
//         }
//       },
//       {
//         path: 'serviceDetail',
//         name: 'serviceDetail',
//         component: () =>
//           import(
//             /* webpackChunkName: "serviceDetail" */ '../views/BusinessAttend/ServiceDetail'
//           ),
//         meta: {
//           hideGuide: true
//         }
//       }
//     ]
//   },
//   // 购物车
//   {
//     path: '/shoppingCart',
//     name: 'shoppingCart',
//     component: Layout,
//     children: [
//       {
//         path: 'info',
//         name: 'shoppingCartInfo',
//         component: () =>
//           import(
//             /* webpackChunkName: "shoppingCart" */ '../views/ShoppingCart'
//           ),
//         meta: {
//           hideGuide: true
//         }
//       }
//     ]
//   },
//   // 关于我们
//   {
//     path: '/about',
//     name: 'about',
//     component: Layout,
//     children: [
//       {
//         path: 'aboutUs',
//         name: 'aboutUs',
//         component: () =>
//           import(/* webpackChunkName: "aboutUs" */ '../views/About'),
//         meta: {
//           hideGuide: true
//         }
//       }
//     ]
//   }
// ]

/*
 ** single: 是否没有子菜单，例如首页
 ** hideGuide: 该子项是否在导航中隐藏，例如详情页
 ** noBread: 是否不显示面包屑
 */

const routeMap = {
  // 首页
  home: {
    base: {
      path: '/home',
      name: 'home',
      redirect: '/home/homePage',
      component: Layout,
      meta: {
        routeName: '首页',
        single: true
      },
      children: [
        {
          path: 'homePage',
          name: 'homePage',
          component: () =>
            import(/* webpackChunkName: "about" */ '../views/Home'),
          meta: {
            hideGuide: true,
            noBread: true
          }
        }
      ]
    }
  },
  // 业务全景图
  businessOverview: {
    base: {
      path: '/businessOverview',
      name: 'businessOverview',
      component: Layout,
      meta: {
        routeName: '业务全景图'
      }
    },
    // 产品全景图
    productOverview: {
      path: 'productOverview',
      name: 'productOverview',
      redirect: '/businessOverview/productOverview/productList',
      component: PageLayout,
      children: [
        {
          path: 'productList',
          name: 'productList',
          component: () =>
            import(
              /* webpackChunkName: "productList" */ '../views/BusinessOverview/ProductOverview/index.vue'
            ),
          meta: {
            routeName: '委托与否'
          }
        },
        {
          path: 'productDetail',
          name: 'productDetail',
          component: () =>
            import(
              /* webpackChunkName: "productDetal" */ '../views/BusinessOverview/ProductOverview/detail.vue'
            ),
          meta: {
            routeName: '委托与否'
          }
        }
      ],
      meta: {
        routeName: '产品全景图'
      }
    },
    // 白名单
    whiteList: {
      path: 'whiteList',
      name: 'whiteList',
      component: () =>
        import(
          /* webpackChunkName: "whiteList" */ '../views/BusinessOverview/WhiteList'
        ),
      meta: {
        routeName: '白名单'
      }
    },
    // 公司全景图
    companyOverview: {
      path: 'companyOverview',
      name: 'companyOverview',
      component: () =>
        import(
          /* webpackChunkName: "companyOverview" */ '../views/BusinessOverview/CompanyOverview'
        ),
      meta: {
        routeName: '公司全景图'
      }
    },
    // 委托查询及处理
    commissionDeal: {
      path: 'commissionDeal',
      name: 'commissionDeal',
      component: () =>
        import(
          /* webpackChunkName: "commissionDeal" */ '../views/BusinessOverview/CommissionDeal'
        ),
      meta: {
        routeName: '委托查询及处理'
      }
    }
  },
  // 业务办理
  businessAttend: {
    base: {
      path: '/businessAttend',
      name: 'businessAttend',
      component: Layout,
      meta: {
        routeName: '业务办理'
      },
      children: [
        // 产品详情
        {
          path: 'serviceDetail',
          name: 'serviceDetail',
          component: () =>
            import(
              /* webpackChunkName: "serviceDetail" */ '../views/BusinessAttend/ServiceDetail'
            ),
          meta: {
            hideGuide: true,
            noBread: true
          }
        }
      ]
    },
    // 新增委托
    attendAdd: {
      path: 'add',
      name: 'attendAdd',
      component: () =>
        import(
          /* webpackChunkName: "attendAdd" */ '../views/BusinessAttend/AttendAdd'
        ),
      meta: {
        routeName: '新增委托'
      }
    },
    // 变更委托
    addtendEdit: {
      path: 'edit',
      name: 'addtendEdit',
      component: () =>
        import(
          /* webpackChunkName: "attendEdit" */ '../views/BusinessAttend/AttendEdit'
        ),
      meta: {
        routeName: '变更委托'
      }
    }
  },
  shoppingCart: {
    base: {
      path: '/shoppingCart',
      name: 'shoppingCart',
      redirect: '/shoppingCart/info',
      component: Layout,
      meta: {
        routeName: '购物车',
        single: true
      },
      children: [
        {
          path: 'info',
          name: 'shoppingCartInfo',
          component: () =>
            import(
              /* webpackChunkName: "shoppingCart" */ '../views/ShoppingCart'
            ),
          meta: {
            routeName: '全部',
            hideGuide: true
          }
        }
      ]
    }
  }
}

export default routeMap
