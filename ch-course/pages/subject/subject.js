// ch-course/pages/subject/subject.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    questionList: [{
        ctime: "2020-06-08 19:45:56",
        id: "277",
        memo: "",
        must: true,
        optionDTOS: [{
            checked: false,
            choices: "1",
            content: "A、18 ",
            ctime: "2020-06-08 19:45:56",
            hasOther: false,
            id: "565",
            otherContent: "",
            questionId: "277",
            status: true,
            utime: ""
          },
          {
            checked: false,
            choices: "2",
            content: "B、19",
            ctime: "2020-06-08 19:45:56",
            hasOther: false,
            id: "566",
            otherContent: "",
            questionId: "277",
            status: true,
            utime: ""
          },
          {
            checked: false,
            choices: "3",
            content: "C、20",
            ctime: "2020-06-08 19:45:56",
            hasOther: false,
            id: "567",
            otherContent: "",
            questionId: "277",
            status: true,
            utime: "",
          }
        ],
        questionnaireId: "124",
        serialNumber: 1,
        status: true,
        title: "您的年龄",
        type: 1,
        utime: "",
      },
      {
        ctime: "2020-06-08 19:45:56",
        id: "279",
        memo: "",
        must: true,
        optionDTOS: [{
            checked: false,
            choices: "1",
            content: "A、50以下",
            ctime: "2020-06-08 19:45:56",
            hasOther: false,
            id: "572",
            otherContent: "",
            questionId: "279",
            status: true,
            utime: ""
          },
          {
            checked: false,
            choices: "2",
            content: "B、50~200",
            ctime: "2020-06-08 19:45:56",
            hasOther: false,
            id: "573",
            otherContent: "",
            questionId: "279",
            status: true,
            utime: ""
          },
          {
            checked: false,
            choices: "3",
            content: "C、200以上",
            ctime: "2020-06-08 19:45:56",
            hasOther: false,
            id: "574",
            otherContent: "",
            questionId: "279",
            status: true,
            utime: ""
          },
        ],
        questionnaireId: "124",
        serialNumber: 2,
        status: true,
        title: "您每月用于零食及校外饮食的费用为",
        type: 2,
        utime: ""
      }
    ],
    current: 0,
    btnWrite: '下一题',
    isAnalysis: false, // 是否显示解释
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setTitle();
    this.setData({
      isAnalysis: options.isAnalysis
    })
  },

  // 用户选择事件
  selectClick(e) {

    if (this.data.isAnalysis) return;

    let {
      index,
      idx,
      type
    } = e.currentTarget.dataset,
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