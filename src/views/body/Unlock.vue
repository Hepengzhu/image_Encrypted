<script setup>
// import { Upload } from "@element-plus/icons-vue/dist/types";
import { ElMessage } from 'element-plus';
import apis from '../../api/apis';
import { useImageData } from '../../stores/img';
import ImgUpload from '/src/components/ImgUpload.vue'

let {getImage,imgFiles} = useImageData()

function upload(){
    // uplodImage(files)
}

// file.raw 获取 原始 File 对象的方式
async function submit(){
  if(imgFiles.length === 0) return ElMessage({
    message: '您还没有选择需要解密的图片!',
    type: 'warning',
  })
  console.log(imgFiles[0].name);  
  // 获取base64编码   
  let imgData = await getImage(imgFiles) 
  console.log(imgData);

  //上传
//   apis.uploadImg(params)

}

</script>
<template>
    <div>
        <div class="upload-buttton">
            <el-button type="primary" size="large" @click="submit()">
                使用xx解密<el-icon class="el-icon--right"><UploadFilled /></el-icon>
            </el-button>
            <el-button type="primary" size="large" @click="submit()">
                使用xx解密<el-icon class="el-icon--right"><UploadFilled /></el-icon>
            </el-button>
            <el-button type="primary" size="large" @click="submit()">
                使用xx解密<el-icon class="el-icon--right"><UploadFilled /></el-icon>
            </el-button>
        </div>
        <ImgUpload/>
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
</style>