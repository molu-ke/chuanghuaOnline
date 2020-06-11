Component({
  externalClasses: ['component-class'],
  options:{
    multipleSlots:true
  },
  properties: {
    isActive:{ //  0 关闭面板  1打开筛选
      type:[Number,String],
      value: 0
    }
  },


  data: {
    _enums:[], // 枚举所有数据
    _industry:[], // 行业数据
    _category:[],  // 类目数据
    userSelect:{
      industry:'',
      category:''
    },
  },

  methods: {

 
    //--------------------------------- 筛选 -------------------------------
    // 选择行业
    selectIndustry(e) {
      let { index, code } = e.currentTarget.dataset;
      this.setData({
        'userSelect.industry':code,
        _category:this.data._enums[index].children
      })
    },

    // 处理用户选中项
    select(e){
      let { index, code } = e.currentTarget.dataset;
      this.setData({
        'userSelect.category':code,
      })
      this.triggerEvent('handleSelect')
    },   
  },


  lifetimes: {

    // 在组件实例进入页面节点树时执行
    attached: function () {
       // 枚举
       let _enums = this.data._enums = [
          {
            code: "1100",message:"IT",
            children:[   
              { title:'互联网产品',list:[ 
                  {code: "1",message:"产品策划"},{code: "2",message:"产品运营"},{code: "3",message:"游戏策划"},
                  {code: "4",message:"游戏运营"},{code: "5",message:"新媒体营销"},{code: "6",message:"网络营销理论"},
                  {code: "7",message:"SEO"},{code: "8",message:"SEM"}
                ] 
              },
              { title:'编辑语言',list:[ 
                  {code: "9",message:"java进阶"},{code: "10",message:"java零基础"},{code: "11",message:"python"},
                  {code: "12",message:"php"}
                ] 
              },
              { title:'前端开发',list:[ 
                  {code: "13",message:"html5"},{code: "14",message:"vue"},{code: "15",message:"react"},
                  {code: "16",message:"实战进阶课"}
                ] 
              },
            ]   
          } ,
          {
            code: "2100",message:"设计",
            children:[   
              { title:'互联网产品',list:[ 
                  {code: "17",message:"产品策划"},{code: "18",message:"产品运营"},{code: "19",message:"游戏策划"},
                  {code: "22",message:"游戏运营"},{code: "21",message:"新媒体营销"},{code: "20",message:"网络营销理论"},
                  {code: "23",message:"SEO"},{code: "24",message:"SEM"}
                ] 
              },
            ]   
          } ,
          {
            code: "3100",message:"电商",
            children:[   
              { title:'编辑语言',list:[ 
                  {code: "25",message:"java进阶"},{code: "27",message:"java零基础"},{code: "28",message:"python"},
                  {code: "26",message:"php"}
                ] 
              },
              { title:'前端开发',list:[ 
                  {code: "29",message:"html5"},{code: "31",message:"vue"},{code: "32",message:"react"},
                  {code: "30",message:"实战进阶课"}
                ] 
              },
            ]    
          } ,
          {
            code: "4100",message:"职业",
            children:[   
              { title:'前端开发',list:[ 
                  {code: "33",message:"html5"},{code: "35",message:"vue"},{code: "36",message:"react"},
                  {code: "34",message:"实战进阶课"}
                ] 
              },
            ]    
          } ,
          {
            code: "5100",message:"升学",
            children:[   
              { title:'互联网产品',list:[ 
                  {code: "37",message:"产品策划"},{code: "42",message:"产品运营"},{code: "43",message:"游戏策划"},
                  {code: "38",message:"游戏运营"},{code: "41",message:"新媒体营销"},{code: "44",message:"网络营销理论"},
                  {code: "39",message:"SEO"},{code: "40",message:"SEM"}
                ] 
              }
            ]    
          } ,
          {
            code: "6100",message:"兴趣",
            children:[   
              { title:'互联网产品',list:[ 
                  {code: "51",message:"产品策划"},{code: "52",message:"产品运营"},{code: "53",message:"游戏策划"},
                  {code: "54",message:"游戏运营"},{code: "55",message:"新媒体营销"},{code: "56",message:"网络营销理论"},
                  {code: "57",message:"SEO"},{code: "58",message:"SEM"}
                ] 
              },
              { title:'编辑语言',list:[ 
                  {code: "69",message:"java进阶"},{code: "610",message:"java零基础"},{code: "61",message:"python"},
                  {code: "62",message:"php"}
                ] 
              },
              { title:'前端开发',list:[ 
                  {code: "63",message:"html5"},{code: "64",message:"vue"},{code: "65",message:"react"},
                  {code: "66",message:"实战进阶课"}
                ] 
              },
            ]     
          } ,
          {
            code: "7100",message:"语言",
            children:[   
              { title:'编辑语言',list:[ 
                  {code: "79",message:"java进阶"},{code: "710",message:"java零基础"},{code: "711",message:"python"},
                  {code: "712",message:"php"}
                ] 
              }
            ]   
          } ,
       ]
      
      // 在_enums抽取行业数据
       let _industry = _enums.map( item =>  ({ code:item.code , message:item.message }) );

       // 确实默认类目
       let  _category = _enums[0].children

      this.setData({
        _industry,
        _category,
        'userSelect.industry':_industry[0].code,
      })
     
      
    }
  }
})
