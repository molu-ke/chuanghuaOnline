// pages/select/select.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isActive:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  screen(){
    // this.setData({
    //   isActive:this.data.isActive==0?1:0
    // })

    wx.navigateBack(-1)
  }

  
})