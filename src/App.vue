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
  // encryptionImg.value.push(...image)
})


</script>

<template>  
  <RouterView />
</template>

<style lang="scss" scoped>

</style>
