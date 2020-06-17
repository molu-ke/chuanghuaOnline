const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    details:{}
  },

  onLoad: function (options) {
    this.getData();
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  getData(){
    this.setData({
      details:app.$mock.testList.data[0]
    })
  },

  handlePrimaryTap(){
    wx.navigateTo({
      url: '/ch-course/pages/subject/subject',
    })
  }
})