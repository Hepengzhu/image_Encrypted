<script setup>
import {ref} from 'vue'
import { ElMessage } from 'element-plus';
import apis from '../../api/apis';
import { useImageData } from '../../stores/img';
import ImgUpload from '/src/components/ImgUpload.vue'
import { storeToRefs } from 'pinia';

let childRef = ref(null) //绑定子组件

let {getImage} = useImageData()
let {imgFiles,encryptionImg,urlList,decryptImg} = storeToRefs(useImageData())

let is_loading = ref(false)
function upload(){
    // uplodImage(files)
}

// file.raw 获取 原始 File 对象的方式
async function submit(type){
  if(imgFiles.length === 0) return ElMessage({
    message: '您还没有选择图片!',
    type: 'warning',
  })
  if(type === 'None') return ElMessage({
    message: '暂不支持其他加密方式!前两种加密还不够你用吗',
    type: 'warning',
  })
  is_loading.value = true
  console.log(imgFiles.value);  
  // 获取base64编码   
  let imgData = await getImage(imgFiles.value) 


  let params = []
  //组装 params
  imgFiles.value.forEach((item,index)=>{
    params.push({
        type:type,
        name:item.name,
        data:imgData[index]
    })
  })   

  //上传解密
  apis.download(params).then(res=>{

    is_loading.value = false
    // 上传成功后添加到已加密图片数组中
    // urlList.value.push(...imgFiles.value) //原图预览添加
    // encryptionImg.value.push(...res) // 加密图片同步
    // console.log(res);
    // 
    if(res.code === 200) {
      ElMessage({
      message: '上传成功!',
      type: 'success',
      })
      // 添加解密图片数据
      decryptImg.value.push(...res.data)
      // 清空上传缓存
      imgFiles.value.length = 0
      // 调用父组件的函数->上传成功后清除文件显示
      childRef.value.uploadSuccess()
    }
    else {
      ElMessage({
      message: '上传失败请刷新重试!',
      type: 'error',
      })
    is_loading.value = false
      
    }
   

  },err=>{
    console.log(err);
    ElMessage({
    message: '上传失败请刷新重试!',
    type: 'error',
    })
    is_loading.value = false
  })

}

</script>
<template>
    <div>
        <div class="upload-buttton">
            <el-button type="primary" plain size="large" @click="submit('aes')">
                使用AES解密<el-icon v-show="!is_loading" :class="['el-icon--right']"><UploadFilled /></el-icon>
                <el-icon v-show="is_loading" :class="['el-icon--right',is_loading?'is-loading':'']" ><Loading /></el-icon>
            </el-button>
            <el-button type="primary" plain size="large" @click="submit('des')">
                使用DES解密<el-icon class="el-icon--right"><UploadFilled /></el-icon>
            </el-button>
            <el-button type="primary" plain size="large" @click="submit()">
                使用其他解密<el-icon class="el-icon--right"><Upload /></el-icon>
            </el-button>
        </div>
        <!-- 图片上传组件 -->
        <ImgUpload ref="childRef"/>
    </div>
</template>
<style lang="scss" scoped>
    .upload-buttton {
        width: 100wh;
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin-bottom: 20px;
        padding: 0px 300px;
    }
    .font {
        font-size: 16px;
        font-weight: 800px;
    }
</style>