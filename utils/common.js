/*业务逻辑共用方法*/
const {BaseVail} = require('./validator');

// 扫码
exports.scanCode = () => {
  return new Promise((resolve, reject) => {
    wx.scanCode({
      success (res) {
        console.log(res)
        resolve(res.result)
      },
      fail(e){
        wx.$showToast(e)
        console.log(e)
        // reject(res.result)
      }
    })

  })
}

// 进一步封装正则较验
exports.testValidator = (parms,duration=2000) => {
  return new Promise((resolve, reject) => {
    let baseVail = new BaseVail(parms).checkListBy();
    if (baseVail) {
      wx.$showToast(baseVail,duration);
      reject();
    }
    resolve();
  })
}
