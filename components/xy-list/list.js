// mainPack/pages/education/list/list.js
Component({
  properties: {
    list: {
      type: Object,
      value: {}
    },
    type: {
      type: [Number,String],
      value: 1
    }
  },
  methods: {
    onPullDownRefresh: function () {
      console.log('aa')
    },
  }
})