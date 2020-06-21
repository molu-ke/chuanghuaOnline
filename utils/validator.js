// 基类
class BaseVail {
  constructor(value) {
    this.value = value;

    /**
     * @desc 校验手机号码
     * @param {String|Number} phone
     * @return {string} 不通过返回提示信息  通过返回空字符串''
     */
    this.phone = phone => {
      let regPhone = /^0?1[3|4|5|6|7|8|9][0-9]\d{8}$/;   //手机
      let msg = '';
      if (phone === '') {
        msg = '请输入手机号码';
      } else if (!regPhone.test(phone)) {
        msg = '手机号码格式不正确';
      }
      return msg;
    }

    /**
     * @desc 校验密码
     * @param {String|Number} password
     * @return {string} 不通过返回提示信息  通过返回空字符串''
     */
    this.password = password => {
      let regPsd = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{8,12}$/; //密码
      let msg = '';
      if (password === '') {
        msg = '请输入密码';
      } else if (password.length < 8 || password.length > 16) {
        msg = '密码输入长度有误，请输入8-16位数字、字母'
      } else if (!regPsd.test(password)) {
        msg = '密码输入有误，必须包含数字、字母';
      }
      return msg;
    }

    /**
     * @desc 比较数据是否一样
     * @param {Array} identical
     * @return {string} 不通过返回提示信息  通过返回空字符串''
     */
    this.isEqual = identical => {
      let msg = '';
      if( identical[0] != identical[1] ){
        msg = '两次密码不一样，请检查'
      }
      return msg;
    }

    /**
     * @desc 校验固定号码
     * @param {String|Number} familyPhone
     * @return {string} 不通过返回提示信息  通过返回空字符串''
     */
    this.familyPhone = familyPhone => {
      let regFix = /^([0-9]{3,4}-?)?[0-9]{7,8}$/;
      let msg = '';
      if (phone === '') {
        msg = '请输入电话号码';
      } else if (!regPhone.test(phone)) {
        msg = '电话号码格式不正确';
      }
      return msg;
    }

    /**
     * @desc 校验邮箱
     * @param {String} email
     * @returns {string} 不通过返回提示信息  通过返回空字符串''
     */
    this.email = email => {
      let regRex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      let msg = '';
      if (email === '') {
        msg = '邮箱不能为空';
      } else if (!regRex.test(email)) {
        msg = '邮箱不正确';
      }
      return msg;
    }


    /**
     * @desc  判断是否为身份证号
     * @param  {String|Number} idCard
     * @return {String} 不通过返回提示信息  通过返回空字符串''
     */
    this.idCard = idCard => {
      let msg = '';
      let regRex = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
      if (idCard === '') {
        msg = "请输入身份证号";
      } else if (!regRex.test(idCard)) {
        msg = "身份证号不正确";
      }
      return msg;
    }
    /**
     * @desc  判断姓名
     * @param  { Array } name
     * @return {String} 不通过返回提示信息  通过返回空字符串''
    */
    this.name = name => {
      let regEn = /[`~!@#$%^&*()_+<>:"{},\/;'.！#￥（——）：；“”‘、，|《。》、【】[\] \w\s]/im;
      let msg = '';
      if (name == '') {
        msg = '请输入姓名';
      } else if (regEn.test(name) || name.length < 2) {
        msg = '姓名错误'
      }
      return msg;
    }

    /**
     * @desc  判断多个内容不为空
     * @param  { Array } isNull
     * @return {String} 不通过返回提示信息  通过返回空字符串''
     */
    this.isNull = isNull => {
      let res = isNull.find(item => item.content == '' || item.content.length == 0)
      return res ? res.hint : ''
    }
  }
  // 调用各方法，都通过的返回 ''  不通过的返回提示文字
  checkListBy() {
    for (let item in this.value) {
      let resture = this[item](this.value[item]);
      if (resture != '') return resture;
    }
  }
}


// 派生类
class FromChekck extends BaseVail {
  constructor(value) {
    super(value);
    // 证件号
    this.papers = isNull => {
      return isNull == '' ? '请输入证件号码' : ''
    }
    // 学号
    this.stuID = isNull => {
      return isNull == '' ? '请输入学号' : ''
    }
  }
}
// eg:
// let baseVail = new FromChekck(parms);
// let result = baseVail.checkListBy();
// if (result) {
//   showToast(result)
//   return;
// }



module.exports = { BaseVail, FromChekck }
