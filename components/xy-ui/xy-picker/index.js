"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// pages/g-picker/index.js
const formControllerBehavior = require("../behaviors/formController");
const pickerMode = 'selector';
Component({
    behaviors: [formControllerBehavior],
    externalClasses: ['dropdown-class'],
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
        range: {
            type: Array,
            value: [],
            __type__(type) { return type; }
        },
        rangeKey: {
            type: String,
            value: 'value',
            observer(_rangeKey) {
                this.setData({ _rangeKey: _rangeKey || 'value' });
            }
        },
        value: {
            type: [String, Array],
            observer(newValue) {
                this.initStatus(newValue);
                this.initValue();
            }
        },
        type: {
            type: String,
            value: 'formItem'
        },
        mode: {
            type: String,
            value: pickerMode
        },
        disabled: {
            type: Boolean,
            value: false
        },
        start: {
            type: String
        },
        required: {
          type: Boolean
        },
        index: {
          type: Number
        },
        showQues: {
          type: Boolean
        },
        end: {
            type: String
        },
        fields: {
            type: String,
            value: 'day'
        },
        customItem: {
            type: String
        },
        splitKey: {
            type: String,
            value: ',',
            observer(_splitKey) {
                this.setData({ _splitKey });
            }
        },
        placeholder: {
            type: String,
            value: '请选择',
            observer(newVal) {
                if (!this.properties.value) {
                    this.setData({
                        _displayName: newVal
                    });
                }
            }
        },
        actionText: {
            type: String,
            value: '选择',
        },
      // 是否为省市选择器
      isSelectCity: {
        type: Boolean
      }
    },
    data: {
        _readonly: false,
        _rangeKey: 'value',
        _splitKey: ',',
        _displayName: '请选择',
        _valueIndex: undefined,
        _status: '',
        _statusMessage: '',
        _isEmpty: true
    },
    ready() {
        const { mode, splitKey } = this.properties;
        // 初始化各属性
        // 处理 rangeKey 的 bug
        if (mode === 'region') {
            this.setData({
                _rangeKey: '',
                _splitKey: splitKey === ',' ? '' : splitKey
            });
        }
        if (mode === 'multiSelector') {
            this.setData({
                _valueIndex: []
            });
        }
        this.initValue();
    },
    methods: {
        // 获取 value 是否为空
        isValueEmpty(value) {
            const { mode } = this.properties;
            if (mode === 'selector' || mode === 'date' || mode === 'time' || mode === 'none') {
                return typeof value === 'undefined' || value === '';
            }
            else {
                return (Array.isArray(value) && value.length === 0);
            }
        },
        // 初始化状态，包括 placeholder, _status
        initStatus(value) {
            const { placeholder } = this.properties;
            if (this.isValueEmpty(value)) {
                this.setData({
                    _status: '',
                    _statusMessage: '',
                    _isEmpty: true,
                    _displayName: placeholder,
                    _valueIndex: value || ''
                });
            }
            else {
                this.setData({
                    _isEmpty: false,
                    _status: '',
                    _statusMessage: ''
                });
            }
        },
        initValue() {
            // 根据 value 初始化选项
            const { value, mode, splitKey } = this.properties;
            if ((!Array.isArray(value) && !!value) || (Array.isArray(value) && value.length > 0)) {
                // 如果是 none 模式，则不进行 value 处理，是什么就展示什么
                if (mode === 'none') {
                    this.setData({
                        _isEmpty: false,
                        _readonly: true,
                        _displayName: Array.isArray(value) ? value.join('') : value
                    });
                    return;
                }
                if (mode === 'selector' || mode === 'multiSelector') {
                    if (Array.isArray(value)) {
                        if (value.length > 0) {
                            this.setValue(value);
                        }
                    }
                    else {
                        this.setValue(value);
                    }
                }
                else {
                    let _displayName = '';
                    if (mode === 'region') {
                        if (Array.isArray(value))
                            _displayName = value.join(splitKey);
                    }
                    else {
                        _displayName = value;
                    }
                    this.setData({
                        _isEmpty: false,
                        _valueIndex: value,
                        _displayName
                    });
                }
            }
        },
        // 通过 value 来设置 index 和 displayName，单选和复选用
        setValue(value) {
            const { range, splitKey } = this.properties;
           
            // ke   防止首次加载时报错
            if (range.length == 0) return;

            const { _rangeKey } = this.data;
            let _displayName, _valueIndex;
            if (Array.isArray(value)) {
                // 多选
                const displayNameArr = [];
                _valueIndex = value.map((v, rangeIdx) => {
                    let findIdx;
                    const rangeCol = range[rangeIdx];
                    // 获取索引
                    rangeCol.some((rangeItem, rangeIdx) => {
                        if (rangeItem.value == v) {
                            findIdx = rangeIdx;
                            displayNameArr.push(rangeItem.displayName || rangeItem[_rangeKey]);
                            return false;
                        }
                    });
                    return findIdx;
                });
                _displayName = displayNameArr.join(splitKey);
            }
            else {
                // 单选
                range.some((rangeItem, rangeIdx) => {
                    if (rangeItem.value === value) {
                        _valueIndex = rangeIdx;
                        _displayName = rangeItem.displayName || rangeItem[_rangeKey] || rangeItem.value;
                        return false;
                    }
                });
            }
            if (_valueIndex === void 0) {
                console.warn('无法检索到选项，请检查传入的 value 值和 range 值是否对应');
                return false;
            }
            this.setData({
                _isEmpty: false,
                _valueIndex,
                _displayName
            });
        },
        handleChange(e) {
        
            this.initStatus();
            const mode = this.properties.mode;
            if (mode === 'selector' || mode === 'multiSelector') {
                this.triggerRangeChange(e);
            }
            else if (mode === 'time' || mode === 'date') {
                this.triggerDateTimeChange(e);
            }
            else if (mode === 'region') {
                this.triggerRegionChange(e);
            }
        },
        // 单选和复选的逻辑
        triggerRangeChange(e) {
            const _valueIndex = e.detail.value;
            const { range, splitKey } = this.properties;
            const { _rangeKey } = this.data;
            // 数组
            let _displayName, displayName, value, name;
            if (Array.isArray(_valueIndex)) {
                name = _valueIndex.map((vidx, index) => {
                    const rangeItem = range[index];
                    vidx = vidx || 0;
                    return rangeItem[vidx] && (rangeItem.displayName || rangeItem[vidx][_rangeKey]);
                });
                value = _valueIndex.map((vidx, index) => {
                    const rangeItem = range[index];
                    vidx = vidx || 0;
                    return rangeItem[vidx] && rangeItem[vidx].value;
                });
                _displayName = name.filter(str => !!str).join(splitKey);
                displayName = name.filter(str => !!str);
            }
            else {
                _displayName = range[_valueIndex]._displayName || range[_valueIndex][_rangeKey];
                displayName = _displayName ;
                value = range[_valueIndex].value;
            }
          // 在省市选择器的基础上  判断省市是否相互对应
          if (this.properties.isSelectCity&&value[0].toString().slice(0, 2) !== value[1].toString().slice(0,2)){
            this.triggerEvent("columnchange", { column: 0, index: _valueIndex[0], type:'reset'});
            return false;
          }
            this.setData({
                _isEmpty: false,
                _valueIndex: e.detail.value,
                _displayName
            });
            this.triggerEvent('change', {
                value,
                displayName: displayName,
                index: _valueIndex
            });
        },
        // 时间选择器
        triggerDateTimeChange(e) {
            this.setData({
                _isEmpty: false,
                _valueIndex: e.detail.value,
                _displayName: e.detail.value
            });
            this.triggerEvent('change', e.detail);
        },
        // 地区选择器
        triggerRegionChange(e) {
            const valueSet = new Set(e.detail.value);
            // 处理掉重复的，无用的前缀等字符
            const _displayName = Array.from(valueSet)
                .filter((name) => {
                return -1 === ['县', '省直辖县级行政区划'].indexOf(name);
            })
                .join(this.properties.splitKey);
            this.setData({
                _isEmpty: false,
                _valueIndex: e.detail.value,
                _displayName
            });
            this.triggerEvent('change', e.detail);
        },
        // 列变化
        triggerColumnchange(e) {
            const { range } = this.properties;
            const { _valueIndex } = this.data;
            // 根据列变化，得到修改后的值
            const { column, value: index } = e.detail;
            const value = range[column][index].value;
            _valueIndex[column] = index;
            for (let i = column + 1; i < range.length; i++) {
                _valueIndex[i] = 0;
            }
            this.setData({ _valueIndex });
            this.triggerEvent('columnchange', {
                column, index, value
            });
        },
        triggerCancel(e) {
            this.triggerEvent('cancel', e.detail);
        }
    }
});
