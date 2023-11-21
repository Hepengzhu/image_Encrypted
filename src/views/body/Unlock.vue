<script setup>
import ImgCheck from '/src/components/ImgCheck.vue'
import {useImageData} from '/src/stores/img.js'
import {useimgDownload} from '/src/hooks'
import { storeToRefs } from "pinia"

const store = useImageData()
const {checkedSrcList} = storeToRefs(store)

// 上传解密
const decrypt = ()=>{
  if(checkedSrcList.value.length === 0) return ElMessage({
      message: '您还没有选择图片!',
      type: 'warning',
    })
  
  // 上传
}
</script>

<template>
  <ImgCheck>
    <el-button size="large" type="primary" @click="decrypt" >一键解密</el-button>
  </ImgCheck>
</template>

