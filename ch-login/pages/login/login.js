const common = require('../../../utils/common');

Page({

  data: {
    form:{
      phone:'',
      password:'',
      isOK: false, // 用户协议勾选状态
      showPassword:false, 
    }
  },


  onLoad(options) {
    
  },

  onShow() {

  },

  // 扫码
  scanCodeEvent(){
    common.scanCode()
  },

  // 输入事件
  inputEvent(e){
    this.data.form[e.target.id] = e.detail.value;
  },

  // 观看密码
  isPasswordEvent(){
    this.setData({'form.showPassword':!this.data.form.showPassword})
  },

  // 用户协议
  selectEvent() {
    this.setData({
      'form.isOK': !this.data.form.isOK
    })
  },

  // 页面跳转
  jumpEvent(e){
    wx.navigateTo({ url:e.currentTarget.dataset.url })
  },

  // 登录
  async loginEvent(){

    let form = this.data.form;

    // 正则较验
    let validator = {
      phone:form.phone,
      isNull:[
        {content:form.password,hint:'请输入密码'},
        {content:form.isOK,hint:'请勾选用户协议'}
      ]
    }

    // await common.testValidator(validator);

    wx.$setStore('user',true)
    wx.switchTab({
      url: '/pages/index/index'
    })
  },
  
  // 微信登录
  async wxLoginEvent(e){
    
    if(e.detail.errMsg !== 'getUserInfo:ok') return;
  
    console.log(e.detail);

    wx.navigateTo({
      url: '/ch-login/pages/bindWechat/bindWechat',
    })
  },

  onShareAppMessage() {

  }
})