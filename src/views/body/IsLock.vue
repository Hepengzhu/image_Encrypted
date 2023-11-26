<script setup>
import ImgCheck from '/src/components/ImgCheck.vue'
import {useImageData} from '/src/stores/img.js'
import {useimgDownload} from '/src/hooks'
import { storeToRefs } from "pinia"
import { ElMessage } from 'element-plus'
import apis from '../../api/apis'


const store = useImageData()
const {checkedSrcList,encryptionImg,urlList,decryptImg} = storeToRefs(store)
// 点击下载
const download = (changeImage)=>{
  if(checkedSrcList.value.length === 0) return ElMessage({
      message: '您还没有选择图片!',
      type: 'warning',
    })
    // 下载
    checkedSrcList.value.forEach((item,index) => {
        // index为图片名字
        useimgDownload(item.data,item.name)
    });
    checkedSrcList.value.length = 0
    // 下载完成恢复原来的状态
    setTimeout(changeImage,1000)  
}

// 解密
const decrypt = (changeImage)=>{

  if(checkedSrcList.value.length === 0) return ElMessage({
      message: '您还没有选择图片!',
      type: 'warning',
    })

  
  apis.download(checkedSrcList.value).then(res=>{
    if(res.code === 200){
        // 更新图片状态
        checkedSrcList.value.forEach(item=>{
          // 添加到已解迷
        const index = encryptionImg.value.indexOf(item)
        decryptImg.value.push(urlList.value[index])
        urlList.value.splice(index,1) //删除原图
        encryptionImg.value.splice(index,1) //删除加密图
        
        })
        changeImage()
        checkedSrcList.value.length = 0
        ElMessage.success('解密成功')
        // 清空选择
    }
    else {
      checkedSrcList.value.length = 0
      changeImage()
      ElMessage.success('解密失败,请刷新重试！')
    }
  },err=>{
    checkedSrcList.value.length = 0
    changeImage()
    ElMessage.success('解密失败,请刷新重试！')
  })

}
</script>

<template>
  <!--imgList:图片数据源为原图片 imgType：选择图片为加密图片 -->
  <ImgCheck :imgList='urlList' :imgType="encryptionImg">
    <template v-slot:button="slotProps">
      <el-button size="large" type="primary" @click="decrypt(slotProps.changeImage)" >解密</el-button>
      <el-button size="large" type="primary" @click="download(slotProps.changeImage)" >下载加密图</el-button>
    </template>
    
  </ImgCheck>
</template>