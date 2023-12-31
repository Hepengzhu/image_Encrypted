/**
 * 环境配置文件
 * 一般企业级项目里面有三个环境
 * 开发环境
 * 测试环境
 * 线上环境
 */

// 获取当前环境
const env = import.meta.env.MODE || 'prod'

const EnvConfig = {
    // 开发
    development:{
        baseApi:'http://localhost:5173/api',
        mockApi:'https://www.fastmock.site/mock/f9f9af55bb0d63fcedcd53f5dca55918/api'
    },
    // 测试
    test:{
        baseApi:'//test.hpz.com/api',
        mockApi:'https://www.fastmock.site/mock/f9f9af55bb0d63fcedcd53f5dca55918/api'
    },
    // 线上
    pro:{
        baseApi:'//hpz.com/api',
        mockApi:'https://www.fastmock.site/mock/f9f9af55bb0d63fcedcd53f5dca55918/api'
    },
}

export default {
    env,
    //mock的总开关
    mock:true,
    // 获取当前环境的配置项，并解构
    ...EnvConfig[env]
}
