import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import  VueCookies  from 'vue-cookies'

export const useUserStore = defineStore('user', () => {
    const userInfo = reactive({
        name:'admin',
        age:'18',
        imgUrl:'/src/assets/image/头像.jpg'
    })
    userInfo.name = VueCookies.get('name')?VueCookies.get('name'):'admin'
    userInfo.age = VueCookies.get('age')?VueCookies.get('age'):'18'
    userInfo.imgUrl = VueCookies.get('imgUrl')?VueCookies.get('imgUrl'):'/src/assets/image/头像.jpg'
    
    const saveUserInfo = (name,age,imgUrl)=>{
        VueCookies.set('name',name)
        VueCookies.set('age',age)
        VueCookies.set('imgUrl',imgUrl)
    }

  return { userInfo, saveUserInfo }
})
