<script setup>
import { reactive,ref } from "vue";
import { RouterLink, useRouter } from "vue-router";

import api from '../api/apis'
const router = useRouter()
let userForm = reactive({
    username:'admin',
    password:'123456'
})
let isRemember = ref(false)
const login = async()=>{
        const res = await api.login(userForm)

        // store.commit('setToken',res.token)
        // 路由跳转
        console.log(res);
        if(res.userInfo.message === '成功') {

            router.push('/main')
        }
        else {
            ElMessage.error('账号或密码错误！')
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
