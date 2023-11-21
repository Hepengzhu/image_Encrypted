import { ref } from 'vue'
import { defineStore } from 'pinia'
import VueCookies from 'vue-cookies'

export const useMenus = defineStore('menus', () => {
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
                    menuCode:'decrypt',
                    path:'/main/decrypt'
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
    currentMenu.value = VueCookies.get('currentMenu')?VueCookies.get('currentMenu'):menus[0]
    subCurrentMenu.value = VueCookies.get('subCurrentMenu')?VueCookies.get('subCurrentMenu'):menus[0].children[0]
    function savaCurrenMenu(currentMenu){
        VueCookies.set('currentMenu',currentMenu)
    }
    function savaSubCurrentMenu(subCurrentMenu){
        VueCookies.set('subCurrentMenu',subCurrentMenu)
    }
  return { menus, currentMenu, subCurrentMenu,savaCurrenMenu,savaSubCurrentMenu }
})