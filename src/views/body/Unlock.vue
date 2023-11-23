<script setup>
import ImgCheck from '/src/components/ImgCheck.vue'
import {useImageData} from '/src/stores/img.js'
import {useimgDownload} from '/src/hooks'
import { storeToRefs } from "pinia"

const store = useImageData()
// 获取已经选择的图片
const {checkedSrcList,encryptionImg,urlList} = storeToRefs(store)

// 上传加密
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
  <!-- 传递选择图片类型 为原图 -->
  <ImgCheck :imgType="urlList">
    <template v-slot:button="slotProps">
      <el-button size="large" type="primary" @click="decrypt(slotProps.changeImage)" >加密</el-button>
      <el-button size="large" type="primary" @click="decrypt(slotProps.changeImage)" >下载</el-button>
    </template>
  </ImgCheck>
</template>

