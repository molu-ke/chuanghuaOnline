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
    currentIndex:1,
    coursewareList:[
      {
        title:'模块一：投资的内涵及其与宏观经济的关系',
        unit:[
          {
            subTitle:'第1单元 投资与投资主体',
            list:[
              { type:'视频',title:'投资与投资主体（1）',current:true,select:false },
              { type:'视频',title:'投资与投资主体（2）',select:false },
            ]
          },
          {
            subTitle:'第2单元 投资与宏观经济运行的内部逻辑',
            list:[
              { type:'视频',title:'投资与宏观经济运行的内部逻辑',select:false},
            ]
          },
          {
            subTitle:'第3单元 投资与短期经济增长',
            list:[
              { type:'视频',title:'投资与短期经济增长',select:false },
            ]
          }
        ]
      }
    ],
    editState:true,
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

  selectEvent(e){
    let {index,unitindex,listindex} = e.currentTarget.dataset;
    let list = this.data.coursewareList[index].unit[unitindex].list[listindex];
    this.setData({
      [`coursewareList[${index}].unit[${unitindex}].list[${listindex}].select`]:!list.select
    })
   
  },

  pageJump(e){
    wx.navigateTo({
      url: '/pages/videoPlay/videoPlay',
    })
  },

  editEvent(){
    this.setData({
      editState:!this.data.editState
    })
  },
})