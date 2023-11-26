<script setup>
import { UploadFilled } from '@element-plus/icons-vue'
import {useImageData} from '../stores/img'
import { ref } from 'vue'
import { storeToRefs } from 'pinia'

let upload = ref(null)
const imgFormData = new FormData()

// 将要上传的图片
let {imgFiles} = storeToRefs(useImageData()) 

// 存放图片的数组
// 关闭自动上传，然后通过文件状态改变时的钩子获取图片
function handleChange(file,files){
  if (file.raw.type !== 'image/jpeg' && file.raw.type !== 'image/png') {
    // 去除当前file,防止显示错误文件
    files.pop()
    ElMessage.error('上传图片格式错误!')
    return false
  } else if (file.raw.size / 1024 / 1024 > 2) {
    files.pop()
    ElMessage.error('上传图片格式不能超过 2MB!')
    return false
  }
  // 添加到上传缓存区
  imgFiles.value.push(file)
  // console.log(file.file);
  // console.log(imgFiles[0]);
}

// 
const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const disabled = ref(false)

// 删除
const handleRemove = (UploadFile,a) => {
  // console.log(UploadFile,a)
  const index = imgFiles.value.indexOf(UploadFile)
  imgFiles.value.splice(index,1)
  // uploadFiles.
}

// 预览
const handlePictureCardPreview = (UploadFile) => {
  dialogImageUrl.value = UploadFile.url
  dialogVisible.value = true
}

const handleDownload = (UploadFile) => {
  console.log(UploadFile)
}

// 上传成功后清除文件显示
const uploadSuccess =()=>{
  // clearFiles
  upload.value.clearFiles()
}

// 暴露出去，以便父组件可以调用
defineExpose({
  uploadSuccess,
});
// this.$refs.upload.clearFiles(); 
</script>

<template>
  <div>
    <div>
      <el-upload
        ref="upload"
        class="upload-demo"
        drag
        :auto-upload="false"
        :on-change="handleChange"
        action="#"
        multiple:true
        list-type="picture-card"
        :on-remove="handleRemove"
        :on-preview="handlePictureCardPreview"
        :on-success="uploadSuccess"
      >
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">
          拖拽到此处或 <br><em>点击选择图片</em>
        </div>

      </el-upload>
      <!-- 图片预览 -->
      <el-dialog v-model="dialogVisible">
        <img w-full :src="dialogImageUrl" alt="Preview Image" class="previewImg" />
      </el-dialog>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .previewImg {
    width: 100%;
    height: 100%;
    object-fit: cover; /* 图片等比例缩放并填充容器 */
  }
</style>
