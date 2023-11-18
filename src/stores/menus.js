import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('menus', () => {
    const menus = [
        {
            icon:'home',
            name:'首页',
            menuCode:'home',
            path:'/main/home',
            children:[
                {
                    icon:'Lock',
                    name:'加密',
                    menuCode:'home',
                    path:'/main/home'
                },
                {
                    icon:'Unlock',
                    name:'解密',
                    menuCode:'unlock',
                    path:'/main/unlock'
                }
            ]
        },
        {
            icon:'share',
            name:'分享',
            menuCode:'share',
            path:'/main/myshare',
            children:[
                {
                    icon:'Share',
                    name:'分享',
                    menuCode:'home',
                    path:'/main/home'
                }
            ]
        },
        {
            icon:'my',
            name:'我的',
            menuCode:'my',
            path:'/main/islock',
            children:[
                {
                    icon:'Lock',
                    name:'已加密',
                    menuCode:'home',
                    path:'/main/islock'
                },
                {
                    icon:'Unlock',
                    name:'一键解密',
                    menuCode:'unlock',
                    path:'/main/unlock'
                }
            ]
        }
    ]
    let currentMenu = ref(menus[0])
    let subCurrentMenu = ref(menus[0].children[0])
    
  return { menus, currentMenu, subCurrentMenu }
})