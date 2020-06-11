// ch-buy/pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList:[
      {
        applyCount: "3",
        clickCount: "18",
        consultCount: "1",
        time:'20200301-20200530',
        discountPrice:'120',
        originalPrice:'120',
        highlightLabel: "高新技能,专业知识,社会认可,启发思维,快速提升高新技能,专业知识,社会认可,启发思维,快速提升",
        id: "1252432486881878018",
        pic: "http://sims-dev.oss-cn-shenzhen.aliyuncs.com/skill/image/efad01f5-4094-4f9e-9995-62b0b72c2e51.png?Expires=4741056399&OSSAccessKeyId=LTAI0ZozMpg0JtYC&Signature=EjoUlAdaa%2Fil5SM4BizAFqRz%2BkA%3D",
        skillClassifyId: 52,
        skillName: "人力资源管理-技能名称",
        sortNo: 0,
        techType: 1,
        techTypeName: "现场授课"
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  submitOrider(){
    wx.navigateTo({
      url: '/ch-buy/pages/payOrder/payOrder',
    })
  }
 
})