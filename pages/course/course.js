const app =getApp();

Page({

  data: {
    isActive:0,
    dataList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  onShow: function () {
    console.log(app.$mock.buyCourse);
    this.setData({
      dataList:app.$mock.buyCourse
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
      url: '/ch-course/pages/details/details',
    })
  }
})