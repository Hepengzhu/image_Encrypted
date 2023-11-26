import request from "./request";

export default {
    // 登录
    login(params) {
        return request({
            url: '/login',
            method: 'post',
            data: params,
            mock: false
        })
    },
    // 上传加密
    uploadImg(params) {
        return request({
            url: '/upload',
            method: 'post',
            data: params,
            mock: false,
        })
    },

    // 获取加密图片 -> app的钩子函数
    getImg(params) {
        return request({
            url: '/getimage',
            method:'post',
            data:params,
            mock:false,
            // maxContentLength: 200000000
        })
    },
    
    // 解密
    download(params) {
        return request({
            url:'/download',
            method:'post',
            data:params,
            mock:false
        })
    }

}