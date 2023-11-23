<script setup>
import { onBeforeUnmount, onMounted, ref} from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import  VueCookies from 'vue-cookies'
import apis from './api/apis'
import {useImageData} from '/src/stores/img.js'
import { storeToRefs } from "pinia"

const store = useImageData()
const {urlList,encryptionImg} = storeToRefs(store)
let isRefreshing = ref(false)

// 获取加密和不加密的图片数据
onMounted(async ()=>{
  const image = await apis.getImg()
  console.log(image);
  // 加密图和原图同步存储
  encryptionImg.value.push(...image.data.encryptionImg)
  urlList.value.push(...image.data.urlList)
})


</script>

<template>  
  <RouterView />
</template>

<style lang="scss" scoped>

</style>
