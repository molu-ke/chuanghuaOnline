
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [
      {
        title: '介绍',
        status: 0
      },
      {
        title: '课表',
        status: 0
      },
      {
        title: '教师',
        status: 0
      }
    ],
    currentIndex: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  switchTab(e){

  },

  deliveryProcess(){
    wx.navigateTo({
      url: '/ch-buy/pages/submitOrder/submitOrder',
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})