const common = require('../../../utils/common');
const {BaseVail} = require('../../../utils/validator');

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

  loginEvent(){

    let form = this.data.form;

    // 正则较验
    let validator = {
      phone:form.phone,
      isNull:[
        {content:form.password,hint:'请输入密码'},
        {content:form.isOK,hint:'请勾选用户协议'}
      ]
    }

    let baseVail = new BaseVail(validator);
    let result = baseVail.checkListBy();
    // if (result) {
    //   wx.$showToast(result)
    //   return;
    // }

    wx.$setStore('user',true)
    wx.switchTab({
      url: '/pages/index/index'
    })
  },
  
  onShareAppMessage() {

  }
})