const app = getApp();

Page({

  data: {
    id:'',
    details:[]
  },

  onLoad: function (options) {
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
      details:data
    })
  },

  playEvent(){
    wx.$showToast('购买成功');

    let res = app.$mock.buyCourse.some( item => item.id === this.data.id);
    if(!res){
      let data = app.$mock.trainList.data.find( item => item.id == this.data.id);
      app.$mock.buyCourse.push(data)
    }

    setTimeout(()=>{
      wx.switchTab({
        url: '/pages/course/course',
      })
    },2000)
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