"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// pages/g-image/index.js
// const sdk = require("../../dgd-sdk/index");
Component({
    externalClasses: ['image-class'],
    /**
     * 组件的属性列表
     */
    properties: {
        src: {
            type: String,
            observer() {
                this.renderImage();
            }
        },
        mode: String,
        lazyLoad: Boolean,
        imageStyle: String
    },
    /**
     * 组件的初始数据
     */
    data: {
        filePath: ''
    },
    /**
     * 组件的方法列表
     */
    methods: {
        renderImage() {
            const { src } = this.properties;
            this.downloadFile();
        },
        downloadFile() {
            const { src } = this.properties;
            // if (sdk._CONFIG.CDN_DOMAIN.some(domain => -1 !== src.indexOf(domain))) {
                this.setData({
                    filePath: src
                });
            // }
            // else {
            //     sdk.port.download({
            //         url: src
            //     }).then((res) => {
            //         if (res.statusCode === 200) {
            //             this.setData({
            //                 filePath: res.tempFilePath
            //             });
            //         }
            //     });
            // }
        },
        handleLoad(e) {
            this.triggerEvent('load', e);
        },
        handleError(e) {
            this.triggerEvent('error', e);
        }
    }
});
