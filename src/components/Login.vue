<script setup>
import { reactive,ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
import {useUserStore} from '/src/stores/user.js'
import {useImageData} from '/src/stores/img.js'
import { storeToRefs } from "pinia"
import api from '../api/apis'

const store = useImageData()
const {encryptionImg} = storeToRefs(store)
const {userForm} = storeToRefs(useUserStore())
const router = useRouter()

let isRemember = ref(false)
const login = async()=>{
        const res = await api.login(userForm.value)

        // store.commit('setToken',res.token)
        // 路由跳转
        console.log(res.msg);
        if(res.code ===  200) {
            ElMessage.success(res.msg)
            // // 获取已加密的图片
            // encryptionImg.value.push(...res.userInfo.encryptionImg)
            router.push('/main')
        }
        else {
            ElMessage.error(res.msg)
        }
}

</script>
<template>
    <el-card class="box-card">
        <el-form :inline="true" :model="userForm" :rules="rules" class="form" ref="form">
            <h3 class="login_title">系统登录</h3>
            <el-form-item label="账号" prop="username">
                <el-input v-model="userForm.username" placeholder="请输入账号"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="userForm.password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item>
                <!-- <el-checkbox v-model="isRemember" label="记住密码" size="large" /> -->
            </el-form-item>
            <br>
            <el-form-item>
                <el-button @click="login" type="primary" class="login_button">登录</el-button>
            </el-form-item>
        </el-form>
    </el-card>

    <!-- <div class="bgc">
        <div class="begin">
            <RouterLink to="/main"><el-button type="primary" @click="login"><span>开始使用</span><el-icon><Right /></el-icon></el-button></RouterLink>
        </div>         
    </div> -->
</template>

<style lang="scss" scoped>
    .box-card {
        margin: 180px auto;
        width: 400px;
        .form  {
            width: 100%;
            padding-left: 40px;
            // display: flex;
            // justify-content: center;
            // align-items: center;      
            margin: 10px auto;  
            .login_title {
                width: 100px;
                margin-left: 110px;
                margin-bottom: 10px;
            }
            .login_button {
                width: 200px;
                margin-top: 5px;
                margin-left: 37px;
            }    
        }

    }
</style>
