
// const api = require('../../fetch/api/index')

Page({

  data: {
    bannerList:[{
      picUrl:"//xixitestxixi.oss-cn-shenzhen.aliyuncs.com/publicityMap/5134835f-2be3-4749-b3a5-fdb289c49645.png"
    }],
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

  text(){
    // wx.previewImage({
    //   current: '', // 当前显示图片的http链接
    //   urls: ['http://www.xixi.top/_nuxt/img/9e708c7.jpg','http://www.xixi.top/_nuxt/img/e6a01f2.jpg'] // 需要预览的图片http链接列表
    // })
  },

  onLoad: function (options) {

    let user = wx.$getStore('user');

    console.log(user)
    if(!user){
      wx.redirectTo({
        url: '/ch-login/pages/login/login',
      })
    }


    // api.getData().then(data=>{
    //   console.log(data)
    // });

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
 
  educationClick(e){
    console.log(e);
    wx.navigateTo({
      url: '/ch-buy/pages/introduce/introduce',
    })
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