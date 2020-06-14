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
    this.setData({
      isActive:this.data.isActive==0?1:0
    })
  },

  pageJump(e){
    console.log(e)
    wx.navigateTo({
      url: '/ch-course/pages/details/details',
    })
  }
})