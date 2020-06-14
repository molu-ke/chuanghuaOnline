//app.js
const store = require("./store/index");
const utils = require("./utils/utils");
const mock = require('./mock');

App({
  onLaunch: function () {
    // 把常用工具类挂载在wx上
    Object.assign(wx,utils);
    // 把测试数据挂载在app上
    this.$mock = mock;
  },
  globalData:store
})