<script setup>
import ImgCheck from '/src/components/ImgCheck.vue'
import {useImageData} from '/src/stores/img.js'
import {useimgDownload} from '/src/hooks'
import { storeToRefs } from "pinia"

const store = useImageData()
// 获取已经选择的图片
const {checkedSrcList,encryptionImg} = storeToRefs(store)

// 上传解密
const decrypt = (changeImage)=>{
  if(checkedSrcList.value.length === 0) return ElMessage({
      message: '您还没有选择图片!',
      type: 'warning',
    })
  
  // 上传

  setTimeout(changeImage,1000)

}
</script>

<template>
  <ImgCheck>
    <template v-slot:button="slotProps">
      <el-button size="large" type="primary" @click="decrypt(slotProps.changeImage)" >一键解密</el-button>
    </template>
  </ImgCheck>
</template>

