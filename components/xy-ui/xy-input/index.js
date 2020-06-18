"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// pages/g-input/index.js
const formControllerBehavior = require("../behaviors/formController");
// const validator = require("..//utils/validator");
Component({
    // 缓存数据
    __value__: '',
    options: {
        multipleSlots: true
    },
    behaviors: [formControllerBehavior],
    relations: {
        '../g-form-item/index': {
            type: 'child'
        },
        '../g-form/index': {
            type: 'ancestor'
        }
    },
    properties: {
        label: String,
        value: {
            type: String,
            value: '',
            observer(newVal) {
                // 只有外部特殊设置的 value 才会触发 rerender
                console.log(newVal, this.__value__);
                if (newVal !== this.__value__) {
                    this.__value__ = newVal;
                    this.setData({
                        _value: newVal
                    });
                    if (this.data._status)
                        this.resetStatus();
                }
            }
        },
        placeholder: {
            type: String,
            value: '请输入'
        },
        validateTrigger: {
            type: String,
            value: 'blur'
        },
        type: {
            type: String,
            value: 'text'
        },
        password: Boolean,
        clearable: Boolean,
        disabled: Boolean,
        prepend: Boolean,
        append: Boolean,
        maxlength: {
            type: Number,
            value: 140
        },
        cursorSpacing: {
            type: Number,
            value: 0
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
        confirmType: {
            type: String,
            value: 'done'
        },
        confirmHold: Boolean,
        cursor: Number,
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
        },
        icon: {
            type: String,
            value: ''
        },
        required:{
            type:Boolean,
            value:false
        }
    },
    data: {
        _status: '',
        _value: '',
        _statusMessage: '',
        _focus: false
    },
    ready() {
        this.initSlots();
    },
    methods: {
        getFormNode() {
            const form = this.getRelationNodes('../g-form/index');
            return form && form[0];
        },
        initSlots() {
            const query = this.createSelectorQuery();
            query.selectAll('.slot').boundingClientRect().exec(console.log);
        },
        // 重置状态
        resetStatus() {
            this.setData({
                _status: '',
                _statusMessage: ''
            });
        },
        // 内部校验 input
        validateInput() {
            if (!this.id) {
                throw new Error('请提供需要校验的组件 ID');
            }
            const formNode = this.getFormNode();
            let formData = {};
            if (!formNode)
                return;
            const { rules = {}, validateType = {}, model = {} } = formNode.properties;
            formData = model;
            formData[this.id] = this.__value__;
            // 根据校验规则，有错误显示状态，无错误重置状态
            // validator(formData, { [this.id]: rules[this.id] }, validateType).then((errorArr) => {
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
        // 处理点击
        handleTap(e) {
            this.setData({
                _focus: true
            });
        },
        // 重新处理输入框
        handleInput(e) {
            if (this.data._status)
                this.resetStatus();
            // 将数据存到内存中，防止无节制的 setData
            this.__value__ = e.detail.value;
            this.triggerEvent('input', e.detail);
            this.triggerEvent('change', e.detail);
        },
        // focus
        handleFocus(e) {
            this.setData({ _focus: true });
            this.triggerEvent('focus', e.detail);
        },
        // blur
        handleBlur(e) {
            const { validateTrigger } = this.properties;
            if (validateTrigger === 'blur') {
                // 触发内部校验
                this.validateInput();
            }
            this.setData({ _focus: false });
            this.triggerEvent('blur', e.detail);
            // 避免输入法最后一个字没点击确认
            if (this.__value__ !== e.detail.value) {
                this.__value__ = e.detail.value;
                this.triggerEvent('input', e.detail);
                this.triggerEvent('change', e.detail);
            }
        },
        // confirm
        handleConfirm(e) {
            this.triggerEvent('confirm', e.detail);
        },
        // clear
        handleTapClear(e) {
            const { disabled } = this.properties;
            const { _focus } = this.data;
            if (disabled)
                return false;
            this.triggerEvent('input', { value: '' });
            this.triggerEvent('change', { value: '' });
            if (!_focus) {
                // 触发内部校验
                this.validateInput();
            }
        },
        // tap info
        handleTapIcon() {
            const { icon } = this.properties;
            this.triggerEvent('iconTap', { type: icon });
        }
    }
});
