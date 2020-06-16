const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[ ],
    total:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      list:app.$mock.finishTest,
      total:options.total
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  handlePrimaryTap(){
    wx.navigateTo({
      url: '/ch-course/pages/subject/subject?isAnalysis=true',
    })
  }
})