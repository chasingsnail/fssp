export const setStorage = (k, v) => {
  if (!k || !v) return
  var json = JSON.stringify(v)
  window.localStorage.setItem(k, json)
}

export const getStorage = k => {
  if (!k) return
  let data = null
  try {
    let datajson = window.localStorage.getItem(k)
    datajson = JSON.parse(datajson)
    data = datajson
  } catch (e) {
  } finally {
    return data
  }
}

export const removeStorage = (k) => {
  if (!k) return
  window.localStorage.removeItem(k)
}
