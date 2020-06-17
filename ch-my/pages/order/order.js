const app =getApp();

Page({

  data: {
    dataList:[

    ],
    list: [
      {
        title: '全部订单',
        status: 0
      },
      {
        title: '待支付',
        status: 0
      },
      {
        title: '交易成功',
        status: 0
      },
      {
        title: '关闭交易',
        status: 0
      },
    ],
    currentIndex: 0,
  },

  onLoad: function (options) {
    this.setData({
      dataList:app.$mock.buyCourse
    })
  },

  onShow: function () {

  },

  switchTab(e){
    if(e.detail == 0 || e.detail == 2){
      this.setData({
        dataList:app.$mock.buyCourse
      })
    }else {
      this.setData({
        dataList:[]
      })
    }
  }
})