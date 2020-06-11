// ch-course/pages/details/details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [
      {
        title: '公告',
        status: 0
      },
      {
        title: '课件',
        status: 0
      },
      {
        title: '考核',
        status: 0
      }
    ],
    currentIndex:0,
    coursewareList:[
      {
        title:'模块一：投资的内涵及其与宏观经济的关系',
        unit:[
          {
            subTitle:'第1单元 投资与投资主体',
            list:[
              { type:'视频',title:'投资与投资主体（1）',current:true },
              { type:'视频',title:'投资与投资主体（2）' },
              { type:'文档',title:'投资与投资主体-课件' },
            ]
          },
          {
            subTitle:'第2单元 投资与宏观经济运行的内部逻辑',
            list:[
              { type:'视频',title:'投资与宏观经济运行的内部逻辑' },
              { type:'文档',title:'投资与宏观经济运行的内部逻辑-课件' },
            ]
          },
          {
            subTitle:'第3单元 投资与短期经济增长',
            list:[
              { type:'视频',title:'投资与短期经济增长' },
              { type:'文档',title:'投资与短期经济增长-课件' },
            ]
          }
        ]
      },
      {
        title:'模块二：货币与货币制度',
        unit:[
          {
            subTitle:'第1单元 投资与投资主体',
            list:[
              { type:'视频',title:'投资与投资主体（1）' },
              { type:'视频',title:'投资与投资主体（2）' },
              { type:'文档',title:'投资与投资主体-课件' },
            ]
          },
          {
            subTitle:'第2单元 投资与宏观经济运行的内部逻辑',
            list:[
              { type:'视频',title:'投资与宏观经济运行的内部逻辑' },
              { type:'文档',title:'投资与宏观经济运行的内部逻辑-课件' },
            ]
          },
          {
            subTitle:'第3单元 投资与短期经济增长',
            list:[
              { type:'视频',title:'投资与短期经济增长' },
              { type:'文档',title:'投资与短期经济增长-课件' },
            ]
          }
        ]
      },
      {
        title:'模块三：汇率与汇率制度',
        unit:[
          {
            subTitle:'第1单元 投资与投资主体',
            list:[
              { type:'视频',title:'投资与投资主体（1）' },
              { type:'视频',title:'投资与投资主体（2）' },
              { type:'文档',title:'投资与投资主体-课件' },
            ]
          },
          {
            subTitle:'第2单元 投资与宏观经济运行的内部逻辑',
            list:[
              { type:'视频',title:'投资与宏观经济运行的内部逻辑' },
              { type:'文档',title:'投资与宏观经济运行的内部逻辑-课件' },
            ]
          },
          {
            subTitle:'第3单元 投资与短期经济增长',
            list:[
              { type:'视频',title:'投资与短期经济增长' },
              { type:'文档',title:'投资与短期经济增长-课件' },
            ]
          }
        ]
      },
      {
        title:'模块四：信用与信用体系',
        unit:[
          {
            subTitle:'第1单元 投资与投资主体',
            list:[
              { type:'视频',title:'投资与投资主体（1）' },
              { type:'视频',title:'投资与投资主体（2）' },
              { type:'文档',title:'投资与投资主体-课件' },
            ]
          },
          {
            subTitle:'第2单元 投资与宏观经济运行的内部逻辑',
            list:[
              { type:'视频',title:'投资与宏观经济运行的内部逻辑' },
              { type:'文档',title:'投资与宏观经济运行的内部逻辑-课件' },
            ]
          },
          {
            subTitle:'第3单元 投资与短期经济增长',
            list:[
              { type:'视频',title:'投资与短期经济增长' },
              { type:'文档',title:'投资与短期经济增长-课件' },
            ]
          }
        ]
      }
    ],
    openState:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.coursewareList.forEach( item => {
      this.data.openState.push(false)
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  open(e){
    let index = e.currentTarget.dataset.index;
    this.setData({
      [`openState[${index}]`]:!this.data.openState[index]
    })
  },

  switchTab(e){
    console.log(e.detail)
    this.setData({
      currentIndex:e.detail
    })
  },

  pageJump(e){
    wx.navigateTo({
      url: e.currentTarget.dataset.url,
    })
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})