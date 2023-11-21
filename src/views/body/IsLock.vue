<script setup>
import ImgCheck from '/src/components/ImgCheck.vue'
import {useImageData} from '/src/stores/img.js'
import {useimgDownload} from '/src/hooks'
import { storeToRefs } from "pinia"


const store = useImageData()
const {checkedSrcList} = storeToRefs(store)
// 点击下载
const download = ()=>{
  if(checkedSrcList.value.length === 0) return ElMessage({
      message: '您还没有选择图片!',
      type: 'warning',
    })
    // 下载
    checkedSrcList.value.forEach((url,index) => {
        // index为图片名字
        useimgDownload(url,index)
    });

    // 下载完成恢复原来的状态
    setTimeout(changeImage,1000)
    
}
</script>

<template>
  <ImgCheck>
    <el-button size="large" type="primary" @click="download" >下载</el-button>
  </ImgCheck>
</template>