const app = getApp();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    select:0,
    idCard:'',
    name:'',
    phone:"",
    code:"",
    password:"",
    isOk:false,
    showPassword:false,
    dowmNum: 0, // 倒计时
    msgBtnState: false, // 短信验证码按钮状态
    timerFn: null, // 计时器
    agreeOpt: {
      type: 3,
      title: "温馨提示",
      elements: [
        { content: '请阅读并同意一下内容' },
        { content: '《用户协议》', color: '#1A43A9' },
      ],
      but1: '不同意',
      but2: '同意并继续',
      closable: true
    },
    showDialog: false,
    isClick: false,      //按钮状态  false：未点击  true ：已点击
  },
  /**
 * 生命周期函数--监听页面显示
 */
  onShow: function () {
    // 检查之前的倒计时是否已结束，未结束则继续倒计
    let obj = getStore('registerDownCount');
    if (!obj) return;
    let count = obj.counter - parseInt(new Date().getTime() / 1000 - obj.time / 1000)
    if (count > 0) {
      this.setData({
        msgBtnState: true,
        dowmNum: count
      })
      clearInterval(this.data.timerFn)
      this.countDown();
    }
  },
  /**
 * 生命周期函数--监听页面卸载
 */
  onUnload: function () {
    let obj = {
      counter: this.data.dowmNum,
      time: new Date().getTime()
    }
    setStore('registerDownCount', obj)
  },
  // 获取验证码
  getCode() {
    // 手机号校验通过，则开启定时器
    // 正则较验
    let parms = {
      phone: this.data.phone
    }
    let baseVail = new BaseVail(parms);
    let result = baseVail.checkListBy();
    if (result) {
      showToast(result);
      return;
    }
    this.setData({
      dowmNum: 59
    })
    // 发送获取验证码的请求
    apiObj.getSmsCode({
      type: 1,
      phone: this.data.phone
    })
      .then(res => {
        showToast('验证码发送成功')
        this.countDown();
      }).catch(err => {
        clearInterval(this.data.timerFn);
        this.setData({
          msgBtnState: false,
          timerFn: null,
        })
      })

  },

  // 用户选择反光还是读数
  radioChange(e) {
    let select = parseInt(e.currentTarget.dataset.id);
    this.setData({ select })

  },

  // 开启倒计时
  countDown() {
    this.setData({
      msgBtnState: true,
      timerFn: setInterval(() => {
        if (this.data.dowmNum > 1) {
          this.setData({
            dowmNum: this.data.dowmNum - 1
          })
        } else {
          clearInterval(this.data.timerFn);
          this.setData({
            msgBtnState: false,
            timerFn: null,
          })
        }
      }, 1000)
    })
  },

  // 输入框输入
  inputChange(e) {
    let id = e.currentTarget.id;
    this.setData({
      [id]: e.detail.value
    })
    console.log(e.detail.value)
  },
  // 改变密码的显示
  changePassword(){
    this.setData({
      showPassword:!this.data.showPassword
    })
  },
  // 切换用户协议的状态
  select() {
    this.setData({
      isOK: !this.data.isOK
    })
  },
  // 交互性弹框   同意
  confirm() {
    this.setData({
      isOK: true
    })
  },
  // 判断数据是否填写完整
  inputState() {
    let params = {
      idCard: this.data.idCard,
      name: this.data.name,
      phone: this.data.phone,
      isNull:[{content:this.data.code,hint:'请输入验证码'}],
      password: this.data.password,
    };

    let baseVail = new BaseVail(params);
    let result = baseVail.checkListBy();
    if (result) {
      return showToast(result)
    }
    if (!this.data.isOK) {
      this.setData({
        showDialog: true
      })
      return false;
    }
    return true
  },
  // 点击提交
  submitBtn(){
    if (this.data.isClick) return false;
    this.data.isClick = true;
    if (!this.inputState()) return this.data.isClick = false;

    
    // 调用微信方法，进行人脸识别
    wx.startFacialRecognitionVerify({
      name: this.data.name,
      idCardNumber: this.data.idCard,
      checkAliveType: 1,
      success: res => {
        apiObj.register({
          verifyResult: res.verifyResult,
          realName: this.data.name,
          idCard: this.data.idCard
        })
        .then(faceRes => {
          app.globalData.user = faceRes.data.userCacheVO;
          app.globalData.user.mobile = this.data.phone;       
          setStore('user', app.globalData.user);
          setStore('token', faceRes.data.token);
          this.bindStuFile(faceRes);
        })
        .catch(err=>{
          this.data.isClick = false;
        })
      },
      fail: res => {
        this.data.isClick = false;
      }
    })

  },
  // 绑定学籍
  bindStuFile(){
    let prm = {
      idCard: this.data.idCard,
      mobile: this.data.phone,
      verifyCode: this.data.code,
      password: this.data.password,
    }
    apiObj.bindStuFile(prm)
    .then(res=>{
      showToast('注册成功');
      let status = {
        emptyStuBaseMarker: res.data.emptyStuBaseMarker,
        emptyStuFamily: res.data.emptyStuFamily,
        emptyStuFile: res.data.emptyStuFile,
        emptyStuIncome: res.data.emptyStuIncome,
        emptyStuInfo: res.data.emptyStuInfo,
      }
      setStore('stuStatus', status);
      this.data.isClick = false;
      if (res.data.emptyStuFile) return wx.reLaunch({ url: '/pages/enrollment/enrollment', })
      wx.switchTab({ url: '/pages/my/my', })
    })
    .catch(err=>{
      this.data.isClick = false;
      delStore('token');
    })
  },

  register(){
    wx.redirectTo({
      url: '/ch-login/pages/regSuccess/regSuccess'
    })
  }
})