const app = getApp();


Page({

  data: {
    isActive:0,
    dataList:[]
  },

  onLoad: function (options) {

  },


  onShow: function () {
    this.getData();
  },

  getData(){
    let data = app.$mock.testList.data
    this.setData({
      dataList:data
    })
  },

  screen(){
    wx.navigateTo({
      url: "/pages/select/select",
    })
  },

  pageJump(e){
    console.log(e)
    wx.navigateTo({
      url: '/ch-course/pages/test/test',
    })
  }
})