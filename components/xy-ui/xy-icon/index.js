// pages/g-icon/index.js
let iconType;
Component({
    properties: {
        type: {
            type: String,
            value: iconType
        },
        spin: {
            type: Boolean,
            value: false
        },
        color: {
            type: String,
            value: ''
        },
        size: {
            type: Number,
            value: 36
        }
    },
    data: {
        typeMap: {
            default: '',
            wait: '等待中',
            warn: '警告',
            close: '关闭 按钮',
            ft: '跳转 按钮'
        }
    },
    methods: {}
});
