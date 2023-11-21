<script setup>
import {ref} from 'vue'
import { ElMessage } from 'element-plus';
import apis from '../../api/apis';
import { useImageData } from '../../stores/img';
import ImgUpload from '/src/components/ImgUpload.vue'

let {getImage,imgFiles} = useImageData()
let is_loading = ref(false)
function upload(){
    // uplodImage(files)
}

// file.raw 获取 原始 File 对象的方式
async function submit(){
  if(imgFiles.length === 0) return ElMessage({
    message: '您还没有选择图片!',
    type: 'warning',
  })
  is_loading = true
  // 获取base64编码   
  let imgData = await getImage(imgFiles) 
  console.log(imgData);

  //上传
  apis.uploadImg(imgData).then(res=>{
    console.log(res);
    is_loading = false
  })

}

</script>
<template>
    <div>
        <div class="upload-buttton">
            <el-button type="primary" plain size="large" @click="submit()">
                使用xx加密<el-icon v-show="!is_loading" :class="['el-icon--right']"><UploadFilled /></el-icon>
                <el-icon v-show="is_loading" :class="['el-icon--right',is_loading?'is-loading':'']" ><Loading /></el-icon>
            </el-button>
            <el-button type="primary" plain size="large" @click="submit()">
                使用xx加密<el-icon class="el-icon--right"><UploadFilled /></el-icon>
            </el-button>
            <el-button type="primary" plain size="large" @click="submit()">
                使用xx加密<el-icon class="el-icon--right"><Upload /></el-icon>
            </el-button>
        </div>
        <!-- 图片上传组件 -->
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
    .font {
        font-size: 16px;
        font-weight: 800px;
    }
</style>