const app = getApp();

Page({


  data: {
    questionList:[],
    current: 0,
    btnWrite: '下一题',
    isAnalysis: false, // 是否显示解释
  },

  onLoad: function(options) {
    this.setData({
      isAnalysis: options.isAnalysis?true:false
    })
    this.getData();
  },

  getData(){
    console.log(app.$mock.questionList)
    this.setData({
      questionList:app.$mock.questionList.data
    })
    this.setTitle();
  },

  // 用户选择事件
  selectClick(e) {

    if (this.data.isAnalysis) return;

    let { index, idx, type } = e.currentTarget.dataset,
      list = this.data.questionList[index].optionDTOS
    console.log(index)
    // 单选
    if (type == 1) {
      // 清空选择
      list.forEach(item => {
        item.checked = false
      })
      // 选中
      list[idx].checked = true
      // 多选 
    } else {
      list[idx].checked = !list[idx].checked
    }
    this.setData({
      questionList: this.data.questionList
    })
    console.log(this.data.questionList)
  },

  // 上一题
  handleSecondTap() {
    if (!this.data.current) return;
    this.setData({
      current: --this.data.current
    })

    this.setTitle();
  },

  // 下一题
  handlePrimaryTap() {
    if (this.data.current + 1 == this.data.questionList.length) {
      if (this.data.isAnalysis) return;
      wx.showModal({
        title: '提示',
        content: '你还有题目没有完成，是否确认提交？',
        cancelText: "继续完成",
        confirmText: "现在提交",
        success(res) {
          if (res.confirm) {
            wx.redirectTo({
              url: '/ch-course/pages/mark/mark',
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
      return;
    }

    this.setData({
      current: ++this.data.current
    })
    this.setTitle();
  },

  // 动态设置标题题目数 + 按钮文字
  setTitle() {

    let length = this.data.questionList.length,
      current = this.data.current + 1
    wx.setNavigationBarTitle({
      title: `题目${current}/${length}`
    })

    if (!this.data.isAnalysis) {
      let btnWrite = current == length ? "提交" : "下一题";
      this.setData({
        btnWrite
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },
})