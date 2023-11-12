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
    uploadImg(params){
        return request({
            url:'/api/',
            method:'post',
            data:params,
            mock:false
        })
    }

}