// ch-login/pages/phone/phone.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isOK: false, // 用户协议勾选状态
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  // 用户协议
  select() {
    this.setData({
      isOK: !this.data.isOK
    })
  },

  jump(e){

    if(e.currentTarget.dataset.url){
      wx.navigateTo({ url:e.currentTarget.dataset.url })
    } else {
      wx.navigateBack({ delta: 1 })
    }
  },

  deliveryProcess(){
    wx.navigateTo({ url:'/ch-login/pages/veriCode/veriCode'})
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

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})