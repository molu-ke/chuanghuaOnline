//app.js
const store = require("./store/index")
const utils = require("./utils/utils")

App({
  onLaunch: function () {
    console.log(store)
    // 把常用工具类挂载在wx上
    Object.assign(wx,utils)
  },
  globalData:store
})