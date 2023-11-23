<script setup>
import { onBeforeUnmount, onMounted, ref} from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import  VueCookies from 'vue-cookies'
import apis from './api/apis'
import {useImageData} from '/src/stores/img.js'
import { storeToRefs } from "pinia"

const store = useImageData()
const {encryptionImg} = storeToRefs(store)
let isRefreshing = ref(false)

// 获取加密的图片数据
onMounted(async ()=>{
  const image = await apis.getImg()
  encryptionImg.value.push(...image)
})
// onMounted(()=>{
//     window.addEventListener('onbeforeunload',function(){
//       alert('确定关闭吗')
//       console.log('aaaaaaaaaaaaaaaaa');
//       isRefreshing.value = true
//     }) 
//     window.addEventListener('onunload',function(){
//       alert('确定关闭吗')
//       // 如果不是刷新操作，这清除
//       if(!isRefreshing.value){
//         alert('确定关闭吗')
//           VueCookies.remove('currentMenu')
//           VueCookies.remove('subCurrentMenu')  
//       }
//       // 恢复
//       isRefreshing.value = false
//   })


// })
    // window.onbeforeunload = function(){
    //   alert('lalaal')
    //   isRefreshing.value = true
    // }
    // window.onunload = function(){
    //   if(!isRefreshing.value){
    //     console.log('app加载了');
    //     VueCookies.remove('currentMenu')
    //     VueCookies.remove('subCurrentMenu')    
    //   }
    // }
</script>

<template>  
  <RouterView />
</template>

<style lang="scss" scoped>

</style>
