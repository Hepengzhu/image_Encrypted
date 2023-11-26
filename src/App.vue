<script setup>
import { onBeforeUnmount, onMounted, ref} from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import  VueCookies from 'vue-cookies'
import apis from './api/apis'
import {useImageData} from '/src/stores/img.js'
import { storeToRefs } from "pinia"

const store = useImageData()
const {urlList,encryptionImg,decryptImg} = storeToRefs(store)
let isRefreshing = ref(false)


let index = -1

// 获取加密和不加密的图片数据
// onMounted(async ()=>{
//   let res = await apis.getImg({index:100,other:str})
//   console.log(res);
//   while(res.code == 200) {
//     index++
//     res = await apis.getImg({index:index,other:str})
//     // console.log(res.data);
//     if(res.type !== 'nul') {
//       if(index % 2 == 0) urlList.value.push(res)
//       else encryptionImg.value.push(res)
//     }
//     if(res.type === 'nul' && index % 2 == 0) {
//       decryptImg.value.push(res)
//     }
//   }
  
// 接口数据
  // let image = await apis.getImg()
  // console.log(image);
  // // 加密图和原图同步存储
  // encryptionImg.value.push(...image.data.encryptionImg) //加密图片
  // urlList.value.push(...image.data.urlList) //加密原图
  // decryptImg.value.push(...image.data.decryptImg) //解密的原图

// })


</script>

<template>  
  <RouterView />
</template>

<style lang="scss" scoped>

</style>
