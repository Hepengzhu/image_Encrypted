import axios from "axios";
import config from "../config";
import  VueCookies  from "vue-cookies";
// import { ElMessage } from "element-plus";
const NETWORK_ERROE = '网络请求异常,请稍后再试'

// axios.defaults.maxContentLength = 200000000;
const service = axios.create({
    baseURL:config.baseURL,
    withCredentials: false, // 不携带 Cookie
    timeout:5000,
    maxContentLength : 20000000
})

// 请求拦截器 (请求之前做一些事)
service.interceptors.request.use((req)=>{
    // 自定义header
    // const userForm = VueCookies.get('username')
    req.headers['username'] = VueCookies.get('username')?VueCookies.get('username'):'hpz';
    // jwt-token认证的时候
    return req
})

// 响应拦截器(请求之后做一些事)
service.interceptors.response.use((res)=>{
    // 对请求结果进行统一的处理  
    // 解构结果
    try {
        // console.log(res.data);
        // console.log('aaaaaaaaaaa');
        // console.log(res.data);
        const {data,msg} = res.data
        if(res.status == 200) {
            return res.data
        }else{
            console.log(msg,data);
            // 网络请求错误
            ElMessage.error(msg || NETWORK_ERROE)
            return Promise.reject(msg || NETWORK_ERROE)
        }
    } catch (error) {
        ElMessage.error('请求服务器错误!')
    }
})


// 封装核心函数
function request(options) {
    /**
     * options:{
     *  method:'get',
     *  data:{
     *      相关参数
     *  },
     * mock:false
     * .....
     * }
     */
    options.method = options.method || 'get' //如果options.method为空 给个默认的请求方法get
    if(options.method.toLowerCase() == 'get') {
        options.params = options.data//参数
    }

    // 对mock的处理
    let isMock = config.mock //获取系统mock的开关(判断当前是否为mock模拟)
    if(typeof options.mock !== 'undefined') {
        //如果当前options 配置了mock  则使用配置的mock
        isMock = options.mock
    }

    // 对线上环境做处理
    if(config.evn == 'prod') {
        //如果是线上环境  直接设置 为线上的baseURL
        service.defaults.baseURL = config.baseApi
    }else {
        // 否则根据 mock的开关来决定
        service.defaults.baseURL = isMock? config.mockApi : config.baseApi
    }
    return service(options)
}

export default request