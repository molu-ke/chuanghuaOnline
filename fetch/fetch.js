/*  
 * @发送网络请求  sendRequest()
 * @param {string}   url  请求的地址
 * @param {object}   data:object    要发送的参数
 *                   method:string  请求方式 GET或POST
 *                   load:number    是否选择有加载框  0 没  1有
 *                   param:Object    扩展参数
 *                         param.errmsg   是否显示错误信息  0 没   1 有
 *                                        默认显示   
 * @return {object}  res  后台返回数据
 */
const { getStore, delStore, showToast } = require('../utils/utils.js');
function sendRequest(url, {
  data = {},
  method = 'POST',
  load = 0,
  ...param
} = {}) {
  return new Promise((resolve, reject) => {
    if (load == 1) {
      wx.showLoading({
        mask: true,
        title: '加载中'
      })
    }
    let token = getStore('token') ? getStore('token') : '';
    wx.request({
      url: url,
      data: data,
      method: method,
      header: {
        // 'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': token
      },
      success: function(res) {
        load == 1 && wx.hideLoading();

        if( res.data.errcode != 200){
          // 用户令牌失效
          if (res.data.errcode == 401 || res.data.errcode == 403) {
            showToast("登录授权信息过期，请重新授权登录", 2000)
            // 清空用户信息
            delStore('token');
            delStore('user');
            getApp().globalData.user = ''

            setTimeout(() => {
              wx.reLaunch({
                url: '/pages/binding/binding'
              })
            }, 2000)
            reject(res.data)
          }
          !param.errmsg && showToast(res.data.errmsg, 2000)
          reject(res.data)
        } 
        resolve(res.data)
      },
      fail: function(err) {
        load == 1 && wx.hideLoading();
        showToast("连接失败，请稍后再试",3000)
        reject(err);
      }
    })
  })
}
module.exports.sendRequest = sendRequest;