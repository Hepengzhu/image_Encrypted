<script setup>
import { ref } from "vue";
const imgUrl = ref('/src/assets/image/头像.jpg')
const uerInfo = ref({
    nickName:'admin'
})
</script>
<template>
    <div class="header">
        <img src="/src/assets/image/logo@2x.png" alt="图像加密">
        <div class="header-right">
            <div>
                <el-dropdown>
                <div class="user-info">
                    <div class="avatar"></div>
                    <el-avatar :size="50" :src="imgUrl" />
                    <span class="nick-name">{{uerInfo.nickName}}</span>
                </div>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>修改头像</el-dropdown-item>
                        <el-dropdown-item>修改密码</el-dropdown-item>
                        <el-dropdown-item>退出</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
            </div>

            <div><el-icon><Sort /></el-icon></div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
    .header{
        box-shadow: 0 3px 10px 0 rgb(0 0 0 / .1);
        height: 56px;
        padding: 0 24px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        img {
            height: 30px;
            border: 0;
            vertical-align: middle;
        }
        .header-right {
            display: flex;
            align-items: center;
            justify-content: space-around;
            .user-info {
                // 去掉黑框
                outline: none;
                display: flex;
                .nick-name {
                    cursor: pointer;
                    color: var(--el-color-primary);
                    display: flex;
                    align-items: center;
                }
            }
            div {
                margin-right: 8px;
            }
        }
    }
</style>
