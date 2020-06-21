const common = require('../../utils/common');

Component({
  externalClasses: ['component-class'],
  options: {
    pureDataPattern: /^_/
  },

  properties: {
    phone:{
      type:'String',
      value:''
    }
  },

  data: {
    written:'发送验证码',
    _number: 60, // 倒计时
    _isSend: false, // 短信验证码按钮状态
    _timer: null, // 计时器
  },

  lifetimes:{
    // 在组件实例被从页面节点树移除时执行
    detached() {
      this.clearTimer();
    },
  },

  methods: {
    // 获取验证码
    async sendCodeEvent() {

      // 锁 禁止用户点击
      if(this.data._isSend ) return;

      // 较验手机号码
      let {phone} = this.data;
      await common.testValidator({phone});

      this.setData({ 
        written:'发送中',
        _isSend:true
      });

      // 发送成功
      wx.$showToast('验证码发送成功');
      this.data._number--;
      this.setData({ 
        written:'已发送'+this.data._number+'S',
      });

      this.data._timer = setInterval(() => {
        if (this.data._number > 1) {
          this.data._number--;
          this.setData({ 
            written:'已发送'+this.data._number+'S',
          });
        } else {
          this.clearTimer();
        }
      }, 1000)
    },

    // 清除定时器
    clearTimer() {
      clearInterval(this.data._timer);
      this.setData({
        _isSend: false,
        _timer: null,
        _number:60,
        written:'重新发送'
      })
    },
  }
})
