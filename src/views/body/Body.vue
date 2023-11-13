<script setup>
import { ref } from "vue"
import { useRouter,RouterView } from "vue-router"

const router = useRouter()
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
                name:'解密',
                menuCode:'unlock',
                path:'/main/unlock'
            }
        ]
    }
]
let currentMenu = ref(menus[0])
let subCurrentMenu = ref(menus[0].children[0])
function jump(item) {
    // 如果点击的是当前菜单或者点击菜单的路径为空 直接返回
    if(!item.path || item.menuCode === currentMenu.value.menuCode) return 
    // 修改当前菜单
    currentMenu.value = item
    subCurrentMenu.value = item.children[0]
    //路由跳转
    router.push(item.path)

}

function subJump(sub){
    // 如果点击的是当前菜单或者点击菜单的路径为空 直接返回
    if(!sub.path || sub.menuCode === subCurrentMenu.value.menuCode) return 

    // 修改当前菜单
    subCurrentMenu.value = sub
    //路由跳转
    router.push(sub.path)
}
</script>
<template>
    <div class="body">
        <!-- 侧边栏 -->
        <div class="left-sider">
            <div class="menu-list">
                <div v-for="item in menus" @click="jump(item)" :class="['menu-item',item.menuCode === currentMenu.menuCode?'active':'']" :key="item.menuCode">
                    <img :src="`src/assets/icon-image/icon-${item.icon}${item.menuCode === currentMenu.menuCode?'-active':''}.png`" :alt="item.name" class="item-img">
                    <div class="text">{{item.name}}</div>
                </div>
            </div>
            <div class="menu-sub-list">
                <div :class="['menu-item-sub',sub.menuCode === subCurrentMenu.menuCode?'active':'']" @click="subJump(sub)" v-for="sub in currentMenu.children" :key="sub.name">
                    <span><component class="iconfont" :is="sub.icon" /></span>
                    <span class="text">{{sub.name}}</span>
                </div>
            </div>
        </div>

        <!-- 内容 -->
        <div class="body-content">
            <!-- body-content -->
            <RouterView/>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .body {
        display: flex;
        .left-sider {
            border-right: 1px solid #f1f2f4;
            display: flex;
            .menu-list {
                height: calc(100vh - 56px);
                width: 80px;
                box-shadow: 0 3px 10px 0 rgb(0 0 0 / 6%);
                border-right: 1px solid #f1f2f4;
                .menu-item {
                    text-align: center;
                    font-size: 14px;
                    font-weight: bold;
                    padding: 20px 0px;
                    cursor: pointer;
                    &:hover {
                        background: #f3f3f3;
                    }
                    .iconfont {
                        font-weight: normal;
                        font-size: 28px;
                    }
                    .item-img {
                        width: 36px;
                        height: auto;
                    }
                }
                .active {
                    .iconfont{
                        color: #06a7ff;
                    }
                    .text {
                        color:#06a7ff;
                    }
                }
            }
        //二级目录 
        .menu-sub-list{
            width: 200px;
            padding: 20px 10px 0px;
            position: relative;
            .menu-item-sub {
                text-align:start;
                line-height: 40px;
                border-radius: 5px;
                padding-left: 40px;
                cursor: pointer;
                &:hover{
                    background-color: #f3f3f3;
                }
                span {
                    display: inline-block;
                    
                }
                .iconfont {
                    position: relative;
                    top: 4px;
                    width: 25px;
                    height: 25px;
                    font-size: 14px;
                    margin-right: 10px;
                }
                .text {
                    font-size: 16px;
                }
            }
            .active {
                background: #eef9fe;
                .iconfont{
                    color: #05a1f5;
                }
                .text {
                    color: #05a1f5;
                }
            }
        }
        }
        .body-content {
            width: 100%;
            margin: 10px 10px 0px 10px;
        }
    }
</style>
