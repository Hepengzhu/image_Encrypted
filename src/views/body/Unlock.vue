<script setup>
import ImgCheck from '/src/components/ImgCheck.vue'
import {useImageData} from '/src/stores/img.js'
import {useimgDownload} from '/src/hooks'
import { storeToRefs } from "pinia"
import apis from '../../api/apis'

const store = useImageData()
// 获取已经选择的图片
const {checkedSrcList,encryptionImg,urlList,decryptImg} = storeToRefs(store)

// 上传加密
const encryption = (changeImage)=>{
  if(checkedSrcList.value.length === 0) return ElMessage({
      message: '您还没有选择图片!',
      type: 'warning',
    })

  checkedSrcList.value.forEach(item=>{
    item.type = 'aes'
  })
console.log(checkedSrcList.value);
  // 上传
  // setTimeout(changeImage,1000)
  apis.uploadImg(checkedSrcList.value).then(res=>{
    if(res.code == 200) {
      // 更新图片状态
      checkedSrcList.value.forEach(item=>{
        // 添加到加迷
        const index = decryptImg.value.indexOf(item)
        encryptionImg.value.push(...res.data) //添加加密图
        urlList.value.push(item)  //添加原图
        decryptImg.value.splice(index,1) //删除解密图
      })
      changeImage()
      checkedSrcList.value.length = 0
      ElMessage.success('加密成功')
    }
    else {
      changeImage()
      checkedSrcList.value.length = 0
      ElMessage.error('加密失败,请刷新重试！')
    }
  },err=>{
    changeImage()
    checkedSrcList.value.length = 0
    ElMessage.error('加密失败,请刷新重试！')
  })


}

// 下载
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


</script>

<template>
  <!-- 传递选择图片类型 为已解密原图 decryptImg -->
  <ImgCheck :imgList="decryptImg">
    <template v-slot:button="slotProps">
      <el-button size="large" type="primary" @click="encryption(slotProps.changeImage)" >加密</el-button>
      <el-button size="large" type="primary" @click="download(slotProps.changeImage)" >下载</el-button>
    </template>
  </ImgCheck>
</template>

