

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isOK: false, // 用户协议勾选状态
    showPassword:true,
  },


  onLoad: function (options) {

  },

  jump(e){
    wx.navigateTo({ url:e.currentTarget.dataset.url })
  },

  // 微信登录
  wechatLogin(){
    wx.navigateTo({ url:'/ch-login/pages/bindWechat/bindWechat' })
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

  loginEvent(){
    wx.$setStore('user',true)
    wx.switchTab({
      url: '/pages/index/index'
    })
  },


   // 用户协议
   select() {
    this.setData({
      isOK: !this.data.isOK
    })
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