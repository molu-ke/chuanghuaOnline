import { toUrlGetKey } from '../../utils/utils.js';

Component({
  properties: {
    bannerConfig: {
      type: Object,
      value: {
        indicatorDots: false,
        indicatorColor: 'rgba(255, 255, 255, .5)',
        indicatorActiveColor: 'rgba(255, 255, 255, 1)',
        vertical: false,
        interval: 3000,
        duration: 500,
        autoplay: true
      }
    },
    topicTitle: {
      type: String,
      value: ''
    },
    list: {
      type: Array,
      value: ["1", "2", "3"]
    },
    location: {
      type: Number,
      value: null
    },
    bannerList:{
      type: Array,
      value: []
    },
  },
  data: {
    _index: 0,

  },
  ready() {

  },
  // 组件方法
  methods: {
    bannerClick(e) {
      if (!e.currentTarget.dataset.item.linkUrl) return false;
      const url = e.currentTarget.dataset.item.linkUrl;
      if (url.indexOf('https://www.xixi.top') > -1) {
        const wxUrl = toUrlGetKey(url, 'url');
        const type = toUrlGetKey(url, 'type');
        console.log('wxUrl', wxUrl)
        if (type === 'education' || type === 'skill') {
          wx.navigateTo({
            url: type ? `/${wxUrl}?key=${type}` : wxUrl
          })
        } else {
          wx.navigateTo({
            url: type ? `/${wxUrl}?type=${type}` : wxUrl
          })
        }
      } else {
        wx.navigateTo({
          url: '/components/myComp/webView/webView?url=' + e.currentTarget.dataset.item.linkUrl
        })
      }
      
    },
    change(e) {
      this.setData({
        _index: e.detail.current
      })
    },
  }
})
