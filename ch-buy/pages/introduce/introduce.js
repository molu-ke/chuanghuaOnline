const app = getApp();


Page({

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

    id:'',
    details:{}
  },

  
  onLoad(options){
    this.data.id = options.id;
    this.getData();
  },

  onShow: function () {

  },

  getData(){
    let data = app.$mock.details.data[this.data.id];
    console.log(data)
    this.setData({
      details:data
    })
  },

  switchTab(e){

  },

  deliveryProcess(){
    let { id,cost } = this.data.details;
    let _this = this;
    if(cost){
      wx.navigateTo({
        url: '/ch-buy/pages/submitOrder/submitOrder?id='+id,
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '是否确定购买该课程？',
        cancelText: "取消",
        confirmText: "购买",
        success(res) {
          if (res.confirm) {
            wx.$showToast('购买成功');

            let res = app.$mock.buyCourse.some( item => item.id === _this.data.id);
            if(!res){
              let data = app.$mock.trainList.data.find( item => item.id == _this.data.id);
              app.$mock.buyCourse.push(data)
            }

            setTimeout(()=>{
              wx.switchTab({
                url: '/pages/course/course',
              })
            },2000)

            
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }

   
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})