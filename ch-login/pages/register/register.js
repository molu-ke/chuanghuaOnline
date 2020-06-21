const app = getApp();
const common = require('../../../utils/common');


Page({

  data: {
    form:{
      phone:'',
      code:"",
      password:'',
      definePass:"",
      bindWx:false,
      referee:'',
      isOK:false, // 用户协议勾选状态
      showPassword:false,
    },
    wxAuthMsg:{}, // 微信授权信息
    




    showDialog: false,
    isClick: false,      //按钮状态  false：未点击  true ：已点击
  },

  onShow() {
    // 检查之前的倒计时是否已结束，未结束则继续倒计
    // let obj = getStore('registerDownCount');
    // if (!obj) return;
    // let count = obj.counter - parseInt(new Date().getTime() / 1000 - obj.time / 1000)
    // if (count > 0) {
    //   this.setData({
    //     msgBtnState: true,
    //     dowmNum: count
    //   })
    //   clearInterval(this.data.timerFn)
    //   this.countDown();
    // }
  },

  // 输入事件
  inputEvent(e){
    this.setData({
      [`form.${e.currentTarget.id}`]:e.detail.value
    })
  },

   // 观看密码
   isPasswordEvent(){
    this.setData({'form.showPassword':!this.data.form.showPassword})
  },

  // 绑定微信
  authEvent(e){
    console.log(e)
  },

  // 扫码
  async scanCodeEvent(){
    let res = await common.scanCode();
    this.setData({
      'form.referee':res
    })
    console.log(res)
  },

  // 切换用户协议的状态
  selectEvent() {
    this.setData({
      'form.isOK': !this.data.form.isOK
    })
  },

  // 注册
  async registerEvent(){
    let form = this.data.form
    let validator = {
      phone:form.phone,
      password:form.password,
      isEqual:[form.password,form.definePass],
      isNull:[
        {content:form.code,hint:'请输入验证码'},
        {content:form.isOK,hint:'请勾选用户协议'}
      ]
    }
    // await common.testValidator(validator);
    console.log(form)
    wx.redirectTo({
      url: '/ch-login/pages/regSuccess/regSuccess'
    })
  }
})