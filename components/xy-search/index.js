// components/recruit-search/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    placeholder:{
      type:String,
      value:'请输入企业关键字'
    },
    maxlength: {
      type: Number,
      value: 140
    },
    confirmType: {
      type: String,
      value: 'done'
    },
    inputVal: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
  },
  /**
   * 组件的方法列表
   */
  methods: {
    search(){
      this.triggerEvent('search',this.data.inputVal)
    },
    onChange(e){
      this.setData({
        inputVal: e.detail.value
      })
    },
  }
})
