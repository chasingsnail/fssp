import routeMap from '@/router/config.js'

export const splitRoute = arr => {
  let routeArr = []
  let routeLink = []
  arr.forEach(parent => {
    if (!parent.isOutLink) {
      // 父级非外链
      let parentRoute = routeMap[parent.name] // 当前一级菜单
      // console.log(parentRoute, 2222)
      let routeItem = {
        ...parentRoute.base
      }
      let children = [] // 路由表子项
      let linkChildren = [] // 包含外链子项
      parent.children &&
        parent.children.forEach(child => {
          if (!child.isOutLink) {
            // 子级非外链
            children.push(parentRoute[child.name])
            linkChildren.push(parentRoute[child.name])
          } else {
            linkChildren.push(child)
          }
        })
      if (!routeItem.children) {
        // 兼容合并非导航页面
        routeItem.children = []
      }
      routeArr.push({
        ...routeItem,
        children: [...routeItem.children, ...children]
      })
      routeLink.push({
        ...routeItem,
        children: [...routeItem.children, ...linkChildren]
      })
    } else {
      routeLink.push(parent)
    }
  })
  return {
    routeArr,
    routeLink
  }
}

export const simpleAlert = (text, type = 'info', delay = 1500) => {
  $.simpleAlert(text, type)
  setTimeout(() => {
    $.simpleAlert('close')
  }, delay)
}
