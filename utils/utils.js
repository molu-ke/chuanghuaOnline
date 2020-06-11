/**
 * 写在前面
 * 因为会把常用工具类挂载在wx上
 * 为了避免跟微信的api冲突，所以命名时，会加上$来区分
 */

// 获取localStorage 同步
exports.$getStore = key => {
  if (!key) return;
  return wx.getStorageSync(key);
}

// 存储localStorage  同步
exports.$setStore = (key, data) => {
  if (!key) return
  wx.setStorageSync(key, data)
}

// 删除localStorage 同步
exports.$delStore = key => {
  if (!key) return;
  return wx.removeStorageSync(key);
}

// 微信弹窗
exports.$showToast = (msg, duration = 2000) => {
  wx.showToast({
    title: msg,
    icon: 'none',
    duration
  });
}

/**
 * 	脱敏处理
 * 	@param  { String }    str    脱敏的数据
 * 	@return { String }   beginLen    开始
 * 	@return { String }   endLen      结束
 */
exports.$desensitization = (str, beginLen, endLen) => {
  if (str == '') return '';
  let stars = '';
  let number = endLen - beginLen;
  for (let i = 0; i < number; i++) {
    stars += '*'
  }
  return str.slice(0, beginLen) + stars + str.slice(endLen)
}

// 获取链接参数
exports.$toUrlGetKey = (url, key) => {
  var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
  var r = url.split('?')[1].substr(0).match(reg); //匹配目标参数
  if (r != null) return unescape(r[2]);
  return null; //返回参数值
}