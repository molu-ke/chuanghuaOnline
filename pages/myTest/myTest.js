// pages/course/course.js
Page({

  data: {
    isActive:0,
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
        pic: "https://xixiprod.oss-cn-shenzhen.aliyuncs.com/skill/image/7ef9d524-02b7-4bf2-8023-11fac6aab758.png",
        skillClassifyId: 52,
        skillName: "2020内科规培医生春季测试",
        sortNo: 0,
        techType: 1,
        techTypeName: "网络+现场授课"
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

  screen(){
    this.setData({
      isActive:this.data.isActive==0?1:0
    })
  },

  pageJump(e){
    console.log(e)
    wx.navigateTo({
      url: '/ch-course/pages/test/test',
    })
  }
})