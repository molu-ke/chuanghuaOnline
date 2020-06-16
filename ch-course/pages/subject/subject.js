const app = getApp();

Page({


  data: {
    questionList:[],
    current: 0,
    btnWrite: '下一题',
    isAnalysis: false, // 是否显示解释
    map :{
      "0":"A",
      "1":"B",
      "2":"C",
      "3":"D",
      "4":"E",
    }
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
         questionItem = this.data.questionList[index],
         optionDTOS = questionItem.optionDTOS,
         map = this.data.map;
    // 单选
    if (type == 1) {
      // 清空选择
      optionDTOS.forEach(item => {
        item.checked = false
      })
      // 选中
      optionDTOS[idx].checked = true;
      // 用户选择了
      questionItem.userAnswer = map[idx];
    // 多选 
    } else {
      optionDTOS[idx].checked = !optionDTOS[idx].checked;
      // 判断是否有选择
      questionItem.userAnswer = [];
      optionDTOS.forEach( (item,index) =>  {
        item.checked && (questionItem.userAnswer.push( map[index] ) )
      })
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
      if (this.data.isAnalysis){
        wx.$showToast('暂没更多题目');
      }else {
        this.submit();
      }
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

  onShow(){

  },

  // 提交事件
  submit(){
    console.log(this.data.questionList)
    let { questionList } =  this.data;

    // 先判断用户是否有未回完题目
    let res = questionList.some( item => {
       if( item.type == 1 ) {
        return !item.userAnswer
       } else if( item.type == 2 ){
         return !item.userAnswer || !item.userAnswer.length
       }
    });

    // 判断用户答案是否正确
    let total = 0;
    questionList.forEach( item => {
      if(item.type == 1){
        item.result = item.answer === item.userAnswer
      } else {
        item.result = item.answer.join('') === item.userAnswer.join('')
      }
      item.result && (total+=item.number)
      
    })

    app.$mock.finishTest =  this.data.questionList;
    if(res){
      wx.showModal({
        title: '提示',
        content: '你还有题目没有完成，是否确认提交？',
        cancelText: "继续完成",
        confirmText: "现在提交",
        success(res) {
          if (res.confirm) {
            wx.redirectTo({
              url: '/ch-course/pages/mark/mark?total='+total,
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '是否确定提交？',
        cancelText: "检查",
        confirmText: "提交",
        success(res) {
          if (res.confirm) {
            wx.redirectTo({
              url: '/ch-course/pages/mark/mark?total='+total,
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  }
})