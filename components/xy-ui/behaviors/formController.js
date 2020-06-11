"use strict";
/**
 * 处理所有表单相关组件
 */
module.exports = Behavior({
    properties: {
        status: {
            type: String,
            observer(_status) {
                this.setData({ _status });
            }
        },
        statusMessage: {
            type: String,
            observer(_statusMessage) {
                this.setData({ _statusMessage });
            }
        }
    },
    data: {
        _status: '',
        _statusMessage: ''
    },
    methods: {
        // 对外提供 warn 方法
        warn(errorConfig) {
            this.setData({
                _status: 'warn',
                _statusMessage: errorConfig.message || '填写有误'
            });
        },
    }
});
