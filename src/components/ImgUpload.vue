<script setup>
import { UploadFilled } from '@element-plus/icons-vue'
import {useImageData} from '../stores/img'
import { ref } from 'vue'

const imgFormData = new FormData()
let {imgFiles,uplodImage} = useImageData()
// let imgFiles = []
// 存放图片的数组
// 关闭自动上传，然后通过文件状态改变时的钩子获取图片
function handleChange(file,fileas){
  imgFiles.push(file)
  // console.log(file.file);
  // console.log(imgFiles[0]);
}

// 
const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const disabled = ref(false)

const handleRemove = (UploadFile) => {
  console.log(UploadFile)
}

const handlePictureCardPreview = (UploadFile) => {
  dialogImageUrl.value = UploadFile.url
  dialogVisible.value = true
}

const handleDownload = (UploadFile) => {
  console.log(UploadFile)
}


// file.raw 获取 原始 File 对象的方式
function submit(){
  console.log(imgFiles[0].name);  
  uplodImage(imgFiles[0].raw) 

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
      :http-request="httpRequest"
    >
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">
        拖拽到此处或 <br><em>点击上传</em>
      </div>
      <template #file="{ file }">
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
              @click="handleRemove(file)"
            >
              <el-icon><Delete /></el-icon>
            </span>
          </span>
        </div>
      </template>
      </el-upload>
      <!-- 图片预览 -->
      <el-dialog v-model="dialogVisible">
        <img w-full :src="dialogImageUrl" alt="Preview Image" />
      </el-dialog>
    </div>
  </div>
</template>
