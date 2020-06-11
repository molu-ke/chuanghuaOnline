"use strict";
Object.defineProperty(exports, "__esModule", {
  value: true
});
// pages/g-upload/index.js
const formControllerBehavior = require("../behaviors/formController");
// const sdk = require("../../dgd-sdk/index");
Component({
  __value__: [],
  _lock: false,
  behaviors: [formControllerBehavior],
  externalClasses: ['cancel-frame'],
  relations: {
    '../xy-form-item/index': {
      type: 'child'
    },
    // '../g-form/index': {
    //     type: 'ancestor'
    // }
  },
  properties: {
    label: String,
    action: String,
    value: {
      type: Array,
      value: [],
      __type__(type) {
        return type;
      },
      observer(newValue, oldValue) {
        if (newValue !== oldValue) {
          this.__value__ = newValue;
          this.resetStatus();
        }
      }
    },
    maxSize: Number,
    name: String,
    header: Object,
    formData: Object,
    maxNumber: Number,
    showCount: Boolean,
    sizeType: {
      type: Array,
      value: ['original', 'compressed'],
      __type__(type) {
        return type;
      }
    },
    sourceType: {
      type: Array,
      value: ['album', 'camera'],
      __type__(type) {
        return type;
      }
    }
  },
  data: {},
  methods: {
    // 重置状态
    resetStatus() {
      this.setData({
        _status: '',
        _statusMessage: ''
      });
    },
    // 选择图片
    chooseImage() {
      const {
        value,
        sizeType,
        sourceType,
        maxNumber,
        maxSize
      } = this.properties;
      if (this._lock)
        return;
      this._lock = true;
      if (maxNumber > 0 && value.length >= maxNumber) {
        wx.showModal({
          title: '温馨提示',
          content: '图片已超过上限',
          showCancel: false
        });
        this._lock = false;
        return false;
      } else {
        const count = maxNumber - value.length;
        // 选择图片
        wx.chooseImage({
          count,
          sizeType,
          sourceType,
          success: (res) => {
            console.log('选择图片', res);
            const newFiles = res.tempFiles
              .map(item => {
                const fileItem = {
                  filePath: item.path,
                  status: 'uploading',
                  progress: 0,
                  data: {}
                };
                if (maxSize && item.size > maxSize) {
                  fileItem.status = 'maxSize';
                }
                return fileItem;
              });
            const newValue = value.concat(newFiles);
            this.__value__ = newValue;
            this.triggerEvent('change', {
              value: newValue
            });
            // 开始上传
            this.uploadFiles(newFiles.filter(item => item.status === 'uploading'));
          },
          fail: (err) => {
            console.error(err);
          },
          complete: () => {
            this._lock = false;
          }
        });
      }
    },
    // 上传操作
    uploadFiles(newFiles) {
      const uploadPromise = newFiles.map((item, index) => {
        const newItem = Object.assign({}, item);


        return new Promise((resolve, reject) => {

          // 延时500*index ms执行,因为后台做了节流
          setTimeout(() => {

            this._upload(item).then((resp) => {
              if (resp.errcode === 200) {
                newItem.data = resp.data;
                newItem.status = 'done';
                newItem.progress = 100;
                this.triggerEvent('upload', {
                  value: newItem
                });
              } else {
                wx.showToast({
                  title: resp.errmsg,
                  icon: 'none',
                  duration: 2000
                });
                newItem.data = resp.data;
                newItem.status = 'error';
                this.triggerEvent('uploadFail', {
                  value: newItem
                });
              }
              resolve(newItem)
            }).catch(err => {
              newItem.data = err.message;
              newItem.status = 'error';
              resolve(newItem)
            });

          }, 500 * index)

        })

        // return this._upload(item).then((resp) => {
        //     if (resp.errcode === 200) {
        //         newItem.data = resp.data;
        //         newItem.status = 'done';
        //         newItem.progress = 100;
        //         this.triggerEvent('upload', { value: newItem });
        //     } else {

        //       wx.showToast({
        //         title: resp.errmsg,
        //         icon: 'none',
        //         duration: 2000
        //       });

        //       newItem.data = resp.data;
        //       newItem.status = 'error';
        //       this.triggerEvent('uploadFail', { value: newItem });
        //     }
        //     return newItem;
        // }).catch(err => {
        //     newItem.data = err.message;
        //     newItem.status = 'error';
        //     return newItem;
        // });

      });


      Promise.all(uploadPromise).then((respArr) => {

          this.__value__ = this.__value__.map(item => {
            respArr.some(respItem => {
              if (respItem.filePath === item.filePath) {
                item = respItem;
                return true;
              }
              return false;
            });
            return item;
          });
          return this.__value__;
        })
        .then(newValue => {
          this.triggerEvent('change', {
            value: newValue
          });
          this.triggerEvent('uploadDone', {
            value: newValue
          });
        })
        .catch(err => {
          console.error(err);
        });
    },
    // 上传单个文件
    _upload(item) {
      const {
        action,
        name,
        formData,
        header
      } = this.properties;
      
      return new Promise((resolve, reject) => {
        wx.uploadFile({
          url: action,
          header,
          filePath: item.filePath,
          name,
          formData,
          success: function(res) {
            try {
              res = JSON.parse(res.data);
              resolve(res);
            } catch (e) {
              resolve(res);
            }

          }
        })

      }).catch(err => {
        wx.showToast({
          title: '服务器忙，请稍后再试！',
          icon: 'none',
          duration: 2000
        });
        reject(err);
      })


      // return sdk.port.upload({
      //     url: action,
      //     filePath: item.filePath,
      //     name,
      //     formData,
      //     header
      // });
    },
    // 移除文件
    removeFile(e) {
      const removeItem = e.currentTarget.dataset.item;
      this.__value__ = this.__value__.filter(item => {
        return item.filePath !== removeItem.filePath;
      });
      this.triggerEvent('remove', {
        value: removeItem
      });
      this.triggerEvent('change', {
        value: this.__value__
      });
    },
    // 点击图片，判断是预览还是重试
    handleClickImage(e) {
      const item = e.currentTarget.dataset.item;
      const {
        value
      } = this.properties;
      // 重新上传，改变文件状态
      if (item.status === 'error') {
        const newValue = value.map((v) => {
          if (v.filePath === item.filePath) {
            item.status = 'uploading';
            return item;
          }
          return v;
        });
        this.triggerEvent('change', {
          value: newValue
        });
        this.uploadFiles([item]);
      } else {
        this.previewImage(item.filePath);
      }
    },
    // 预览图片
    previewImage(filePath) {
      const {
        value
      } = this.properties;

      wx.previewImage({
        current: filePath, // 当前显示图片的http链接  
        urls: value.map((item) => item.filePath) // 需要预览的图片http链接列表  
      })
    }
  }
});