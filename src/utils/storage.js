// 存储token
export const setItem = (name, value) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(name, value)
}
// 获取token
export const getItem = name => {
  const data = window.localStorage.getItem(name)
  try {
    // 尝试把data 转为JavaScript对象
    // 如果转换成功 就一定意味着数据是一个json格式的字符串
    // 如果data不是json格式的字符串 那就失败报错 进入catch
    return JSON.parse(data)
  } catch (err) {
    // 在这里直接原样返回
    return data
  }
}
// 删除token
export const removeItem = () => {
  window.localStorage.removeItem(name)
}
