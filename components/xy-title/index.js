Component({
  properties: {
    text: {
      type: String
    },
    placeholder: {
      type: String
    },
    type: {
      type: Number,
      value:1   //1带左侧块；2不带
    }
  },
  data: {
    text:'标题',
    placeholder:'提示文字',
  },
  methods: {}
});
