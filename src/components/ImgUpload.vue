<script setup>
import { UploadFilled } from '@element-plus/icons-vue'
import {useImageData} from '../stores/img'
import { ref } from 'vue'

const imgFormData = new FormData()
let {imgFiles} = useImageData()

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
  imgFiles.push(file)
  // console.log(file.file);
  // console.log(imgFiles[0]);
}

// 
const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const disabled = ref(false)

// 删除
const handleRemove = (UploadFile,a) => {
  console.log(UploadFile,a)
  const index = imgFiles.indexOf(UploadFile)
  imgFiles.splice(index,1)
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



// this.$refs.upload.clearFiles(); 
</script>

<template>
  <div>
    <div>
      <el-upload
      class="upload-demo"
      drag
      :auto-upload="false"
      :on-change="handleChange"
      action="#"
      multiple:true
      list-type="picture-card"
      :on-remove="handleRemove"
      :on-preview="handlePictureCardPreview"
    >
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">
        拖拽到此处或 <br><em>点击选择图片</em>
      </div>
      <!-- <template #file="{ file }">
        <div>
          <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
          <span class="el-upload-list__item-actions">
            <span
              class="el-upload-list__item-preview"
              @click="handlePictureCardPreview(file)"
            >
              <el-icon><zoom-in /></el-icon>
            </span>
            <span
              v-if="!disabled"
              class="el-upload-list__item-delete"
              @click="handleDownload(file)"
            >
              <el-icon><Download /></el-icon>
            </span>
            <span
              v-if="!disabled"
              class="el-upload-list__item-delete"
              @click="handleRemove(file,fileList)"
            >
              <el-icon><Delete /></el-icon>
            </span>
          </span>
        </div>
      </template> -->
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
