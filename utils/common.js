/*业务逻辑共用方法*/

// 扫码
exports.scanCode = () => {
  return new Promise((resolve, reject) => {
    wx.scanCode({
      success (res) {
        console.log(res)
      }
    })

  })
}