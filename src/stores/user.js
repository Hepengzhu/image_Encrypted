import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import  VueCookies  from 'vue-cookies'

export const useUserStore = defineStore('user', () => {
    const userForm = reactive({
        username:'',
        password:'',
        imgUrl:''
    })
    userForm.username = VueCookies.get('username')?VueCookies.get('username'):'zsy'
    userForm.password = VueCookies.get('password')?VueCookies.get('password'):'z114514'
    userForm.imgUrl = VueCookies.get('imgUrl')?VueCookies.get('imgUrl'):'/src/assets/impassword/头像.jpg'
    
    const saveUserInfo = (username,password,imgUrl)=>{
        VueCookies.set('username',username)
        VueCookies.set('password',password)
        VueCookies.set('imgUrl',imgUrl)
    }

  return { userForm, saveUserInfo }
})
