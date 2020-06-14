const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    dataList:[]
  },


  onLoad(options){
    this.data.id = options.id;
    this.getData();
  },



  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  getData(){
    let data = app.$mock.details.data[this.data.id];
    console.log(data)
    this.setData({
      dataList:[data]
    })
  },

  submitOrider(){
    wx.navigateTo({
      url: '/ch-buy/pages/payOrder/payOrder?id='+this.data.id,
    })
  }
 
})