// ch-course/pages/allCourse/allCourse.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:1, // 1 培训   2 测试 
    dataList:[],
    trainList:[
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
    ],
    testList:[
      {
        applyCount: "3",
        clickCount: "18",
        consultCount: "1",
        time:'20200301-20200530',
        discountPrice:'120',
        originalPrice:'120',
        highlightLabel: "高新技能,专业知识,社会认可,启发思维,快速提升高新技能,专业知识,社会认可,启发思维,快速提升",
        id: "1252432486881878018",
        pic: "https://xixiprod.oss-cn-shenzhen.aliyuncs.com/skill/image/7ef9d524-02b7-4bf2-8023-11fac6aab758.png",
        skillClassifyId: 52,
        skillName: "2020内科规培医生春季测试",
        sortNo: 0,
        techType: 1,
        techTypeName: "现场授课"
      },
    ],
    list: [
      {
        title: '进行中',
        status: 0
      },
      {
        title: '已结束',
        status: 0
      }
    ],
    currentIndex: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let {type} = options;
    wx.setNavigationBarTitle({
      title: type == 1?'所有培训':'所有评测'
    })
    this.setData({
      type,
      dataList:type == 1?this.data.trainList:this.data.testList
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  switchTab(){

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  listEvent(){
    let url = this.data.type == 1 ?'/ch-buy/pages/introduce/introduce':'/ch-course/pages/test/test'
    wx.navigateTo({url})
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})