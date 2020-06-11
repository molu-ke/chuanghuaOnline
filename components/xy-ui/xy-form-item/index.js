"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

Component({
    __timer__: undefined,
    externalClasses: ['component-class'],
    properties: {
        label: String,
        disabled: Boolean,
        status: {
            type: String,
            observer(_status) {
                // 处理 iPhone 平台的问题
                let platform = wx.getSystemInfoSync().brand.toLowerCase();

                if (platform === 'iphone') {
                    // 先清除原有的定时器，再开新的定时器
                    if (this.__timer__)
                        clearTimeout(this.__timer__);
                    this.__timer__ = setTimeout(() => {
                        this.setData({ _status });
                        this.__timer__ = undefined;
                    }, 500);
                }
                else {
                    this.setData({ _status });
                }
            }
        },
        statusMessage: {
            type: String,
            value: '输入有误，请检查后重试',
            observer(_statusMessage = '输入有误，请检查后重试') {
                this.setData({ _statusMessage });
            }
        }
    },
    data: {
        _status: '',
        _statusMessage: ''
    }
});
