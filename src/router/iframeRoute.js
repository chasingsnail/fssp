import Layout from '@/components/Layout'
import PageIframe from '@/components/PageIframe'

export const iframeNode = obj => {
  return {
    path: `/innerlink_${obj.name}`,
    name: `innerlink_${obj.name}`,
    redirect: `innerlink_${obj.name}/link_${obj.name}`,
    component: Layout,
    meta: {
      routeName: obj.text,
      url: obj.outUrl
    },
    children: [
      {
        path: `link_${obj.name}`,
        name: `link_${obj.name}`,
        component: PageIframe,
        meta: {
          url: obj.outUrl,
          noBread: true
        }
      }
    ]
  }
}

export const iframeChildNode = obj => {
  return {
    path: `link_${obj.name}`,
    name: `link_${obj.name}`,
    component: PageIframe,
    meta: {
      url: obj.outUrl,
      innerLink: true,
      routeName: obj.text
    }
  }
}