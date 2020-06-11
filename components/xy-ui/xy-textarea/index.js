"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// pages/g-textarea/index.js
const formControllerBehavior = require("../behaviors/formController");
// const sdk = require("../../dgd-sdk/index");
// const validator = require("../utils/validator");
Component({
    __value__: '',
    // 缓存数据
    behaviors: [formControllerBehavior],
    externalClasses: ['component-class'],
    relations: {
        '../g-form-item/index': {
            type: 'child'
        },
        '../g-form/index': {
            type: 'ancestor'
        }
    },

    properties: {
        value: {
            type: String,
            observer(newVal) {
                // 只有外部特殊设置的 value 才会触发 rerender
                if (newVal !== this.__value__) {
                    this.__value__ = newVal;
                    this.setData({
                        _value: newVal
                    });
                }
            }
        },
        placeholder: {
            type: String,
            value: '请输入内容'
        },
        label: String,
        disabled: Boolean,
        maxlength: {
            type: Number,
            value: 140
        },
        autoFocus: {
            type: Boolean,
            value: false
        },
        focus: {
            type: Boolean,
            value: false,
            observer(newVal) {
                this.setData({
                    _focus: newVal
                });
            }
        },
        height: String,
        autoHeight: {
            type: Boolean,
            value: false
        },
        cursorSpacing: {
            type: Number,
            value: 72
        },
        cursor: {
            type: Number,
            value: 0
        },
        showConfirmBar: {
            type: Boolean,
            value: false
        },
        selectionStart: {
            type: Number,
            value: -1
        },
        selectionEnd: {
            type: Number,
            value: -1
        },
        adjustPosition: {
            type: Boolean,
            value: true
        }
    },
    data: {
        _value: '',
        _status: '',
        _statusMessage: '',
        _focus: false,
        // _platform: sdk.systemInfo.platform.toLowerCase()
    },
    methods: {
        getFormNode() {
            const form = this.getRelationNodes('../g-form/index');
            return form && form[0];
        },
        // 重置状态
        resetStatus() {
            this.setData({
                _status: '',
                _statusMessage: ''
            });
        },
        // 处理点击
        handleTap() {
            this.setData({
                _focus: true
            });
        },
        // 内部校验 input
        validateInput() {
            // if (!this.id) {
            //     throw new Error('请提供需要校验的组件 ID');
            // }
            // const formData = { [this.id]: this.__value__ };
            // const rules = this.getFormNode().properties.rules;
            // 根据校验规则，有错误显示状态，无错误重置状态
            // validator(formData, rules).then((errorArr) => {
            //     console.log('form-field validate: ', formData, rules, errorArr);
            //     if (errorArr.length > 0) {
            //         this.setData({
            //             _status: 'warn',
            //             _statusMessage: errorArr[0].message
            //         });
            //     }
            //     else {
            //         this.resetStatus();
            //     }
            // });
        },
        handleInput(e) {
            if (this.data._status)
                this.resetStatus();
            // 数据存到内存中
            this.__value__ = e.detail.value;
            this.setData({
                _value: e.detail.value
            });
            this.triggerEvent('input', e.detail);
            this.triggerEvent('change', e.detail);
        },
        handleFocus(e) {
            this.triggerEvent('focus', e.detail);
        },
        handleBlur(e) {
            this.validateInput();
            this.triggerEvent('blur', e.detail);
        },
        handleConfirm(e) {
            this.triggerEvent('confirm', e.detail);
        }
    }
});
