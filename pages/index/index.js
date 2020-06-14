const app = getApp();


Page({

  data: {
    bannerList:[{
      picUrl:"//xixitestxixi.oss-cn-shenzhen.aliyuncs.com/publicityMap/5134835f-2be3-4749-b3a5-fdb289c49645.png"
    }],
    trainList:[],
    testList:[]
  },


  onLoad(options){
    this.isLogin();
    this.getTrainData();
    this.getTestData();



  },

  onShow(){

  },

  // 判断是否已经登录
  isLogin(){
    let user = wx.$getStore('user');
    console.log(user)
    if(!user){
      wx.redirectTo({
        url: '/ch-login/pages/login/login',
      })
    }
  },

  // 获取当前培训数据
  getTrainData(){

    let data = app.$mock.trainList.data
    this.setData({
      trainList:data
    })
  },

  // 获取当前测试数据
  getTestData(){
    let data = app.$mock.testList.data
    this.setData({
      testList:data
    })
  },


  trainEvent(e){
    let { id  } = e.currentTarget.dataset.item;
    wx.navigateTo({url:'/ch-buy/pages/introduce/introduce?id='+id})
  },

  testEvent(e){
    wx.navigateTo({
      url: '/ch-course/pages/test/test',
    })
  },

  // 用户点击右上角分享
  onShareAppMessage(){

  }
})