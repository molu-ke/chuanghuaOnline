// components/recruit-tab/index.js
Component({
  options:{
    addGlobalClass: true,
    multipleSlots:true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    list:{
      type:Array,
      value:[]
    },
    num:{
      type:Number,
      value:0
    },
    type:{
      type: String,
      value: ''
    },
    width:{
      type: String,
      value: '50%'
    },
    setHeight:{
      type:Boolean
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
    switchTab(e){
      this.setData({
        num: e.currentTarget.dataset.index
      })
      this.triggerEvent('switchTab',this.data.num)
    }
  }
})
