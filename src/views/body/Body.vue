<script setup>
import { ref } from "vue"
import { useRouter,RouterView } from "vue-router"

const router = useRouter()
const menus = [
    {
        icon:'home',
        name:'首页',
        menuCode:'home',
        path:'/main/home'
    },
    {
        icon:'share',
        name:'分享',
        menuCode:'share',
        path:'/main/myshare'
    },
    {
        icon:'my',
        name:'我的',
        menuCode:'my',
        path:'/main/my'
    }
]
let currentMenu = ref('home')
function jump(item) {
    // 如果点击的是当前菜单或者点击菜单的路径为空 直接返回
    if(!item.path || item.menuCode === currentMenu.value) return 

    // 修改当前菜单
    currentMenu.value = item.menuCode
    //路由跳转
    router.push(item.path)

}
</script>
<template>
    <div class="body">
        <!-- 侧边栏 -->
        <div class="left-sider">
            <div class="menu-list">
                <div v-for="item in menus" @click="jump(item)" :class="['menu-item',item.menuCode === currentMenu?'active':'']" :key="item.menuCode">
                    <img :src="`src/assets/icon-image/icon-${item.icon}${item.menuCode === currentMenu?'-active':''}.png`" :alt="item.name" class="item-img">
                    <div class="text">{{item.name}}</div>
                </div>
            </div>
            <!-- <div class="menu-sub-list"></div> -->
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
        }
        .body-content {
            width: 100%;
            margin: 10px 10px 0px 10px;
        }
    }
</style>
