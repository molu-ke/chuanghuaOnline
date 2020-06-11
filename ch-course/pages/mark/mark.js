// ch-course/pages/mark/mark.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[
      {result:false,optionDTOS:'以下不属于直接投资的是()',choices:1},
      {result:true,optionDTOS:'投资的特性不包括()',choices:2},
      {result:false,optionDTOS:'政府修建基础设施的行为属于()',choices:3},
      {result:true,optionDTOS:'企业在二级市场购买上市公司股票的行为属性于()',choices:4},
      {result:false,optionDTOS:'以下说法错误的是()',choices:5},
      {result:false,optionDTOS:'在宏观的国民经济的层面上，企业部门撤销金融负债主要来自()',choices:6}
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

  handlePrimaryTap(){
    wx.navigateTo({
      url: '/ch-course/pages/subject/subject?isAnalysis=true',
    })
  }
})