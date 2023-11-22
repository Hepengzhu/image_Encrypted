import request from "./request";

export default {
    // 登录
    login(params){
        return request({
            url:'/login',
            method:'post',
            data:params,
            mock:true
        })
    },
    // 上传加密
    uploadImg(params){
        return request({
            url:'/',
            method:'post',
            data:params,
            mock:false
        })
    }

}