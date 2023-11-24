<script setup>
import {ref,onMounted} from 'vue'
import { ElMessage } from 'element-plus';
import apis from '../../api/apis';
import { useImageData } from '../../stores/img';
import ImgUpload from '/src/components/ImgUpload.vue'
import { storeToRefs } from 'pinia';

let {getImage} = useImageData()
let {imgFiles,encryptionImg,urlList} = storeToRefs(useImageData())
let childRef = ref(null)
let is_loading = ref(false) //上传中状态
let img = ref([])

// file.raw 获取 原始 File 对象的方式
async function submit(type){
    
  if(imgFiles.value.length === 0) return ElMessage({
    message: '您还没有选择图片!',
    type: 'warning',
  })    

  if(type === 'None') return ElMessage({
    message: '暂不支持其他加密方式!前两种加密还不够你用吗',
    type: 'warning',
  })


  is_loading = true
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
  console.log(params);

  //上传
//   apis.uploadImg(imgData).then(res=>{
//     is_loading = false
 
//     // 上传成功后添加到已加密图片数组中
//     // urlList.value.push(...imgFiles.value) //原图预览添加
//     // encryptionImg.value.push(...res) // 加密图片同步
//     // 清空上传缓存
//     imgFiles.value.length = 0
//     // 调用父组件的函数->上传成功后清除文件显示
//     childRef.value.uploadSuccess()
//   })

}

</script>
<template>
    <div>
        <div class="upload-buttton">
            <el-button type="primary" plain size="large" @click="submit('AES')">
                使用AES加密<el-icon v-show="!is_loading" :class="['el-icon--right']"><UploadFilled /></el-icon>
                <el-icon v-show="is_loading" :class="['el-icon--right',is_loading?'is-loading':'']" ><Loading /></el-icon>
            </el-button>
            <el-button type="primary" plain size="large" @click="submit('DES')">
                使用DES加密<el-icon class="el-icon--right"><UploadFilled /></el-icon>
            </el-button>
            <el-button type="primary" plain size="large" @click="submit('None')">
                使用其他加密<el-icon class="el-icon--right"><UploadFilled /></el-icon>
            </el-button>
        </div>
        <!-- 图片上传组件 -->
        <ImgUpload ref="childRef" />
        
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