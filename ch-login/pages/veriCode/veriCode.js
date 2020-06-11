
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    Length:4,        //输入框个数
    isFocus:true,    //聚焦
    Value:"",        //输入的内容
    ispassword:false, //是否密文显示 true为密文， false为明文。
  },
  Focus(e){
    var that = this;
    console.log(e.detail.value);
    var inputValue = e.detail.value;
    that.setData({
      Value:inputValue,
    })


    inputValue.length === 4 && this.login();

    console.log(inputValue)
  },
  Tap(){
    var that = this;
    that.setData({
      isFocus:true,
    })
  },
  formSubmit(e){
    console.log(e.detail.value.password);
  },

  login() {
    wx.$setStore('user', true)
    wx.switchTab({
      url: '/pages/index/index'
    })
  },
})