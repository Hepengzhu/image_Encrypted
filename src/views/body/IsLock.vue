<script setup>
import ImgCheck from '/src/components/ImgCheck.vue'
import {useImageData} from '/src/stores/img.js'
import {useimgDownload} from '/src/hooks'
import { storeToRefs } from "pinia"


const store = useImageData()
const {checkedSrcList,encryptionImg,urlList} = storeToRefs(store)
// 点击下载
const download = (changeImage)=>{
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
  <!--imgList:图片数据源为原图片 imgType：选择图片为加密图片 -->
  <ImgCheck :imgList='urlList' :imgType="encryptionImg">
    <template v-slot:button="slotProps">
      <el-button size="large" type="primary" @click="download(slotProps.changeImage)" >解密</el-button>
      <el-button size="large" type="primary" @click="download(slotProps.changeImage)" >下载加密图</el-button>
    </template>
    
  </ImgCheck>
</template>