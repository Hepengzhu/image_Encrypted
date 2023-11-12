<script setup>
// import { Upload } from "@element-plus/icons-vue/dist/types";
import axios from 'axios'
import { useImageData } from '../../stores/img';
import ImgUpload from '/src/components/ImgUpload.vue'

let {uplodImage} = useImageData()
function upload(){
    // uplodImage(files)
}

function change(e) {
          //1.可以通过this拿到这个file的DOM元素
          console.log(this)
          //1.  e 函数事件参数对象中也有这个file的DOM元素对象。使用e.target也可以直接拿到
          console.log(e.target)
          //对开发人员屏蔽，所以直接 必须调用这个文件的DOM对象的files属性，返回一个数组
          let files = e.target.files
          console.log(files)
          // console.log(files.item(0))
          // console.log(files[0])
          // 判断一手是否有文件
          if (!files.length) return
          // 上传文件 创建FormData
          let formData = new FormData()
          console.log(files[0]);
          // upFile就是后台接收的key
          formData.append('upFile', files[0], files[0].name)
          // 将formdata发送到后台即可
          // 我用的 axios.post('url', formData)
          console.log(formData.get('upFile'));
          const file = formData.get('upFile')
          console.log(formData);
          const reader = new FileReader();
            reader.onload = function(event) {
            // 读取完成后，event.target.result 包含了文件的二进制数据
            const binaryData = event.target.result;
            console.log('文件的二进制数据:', binaryData);
            axios.post(`/api`,{formData}).then((res=>{
                console.log(res);
            }))
            };
            // 通过 FileReader 对象读取文件内容
            reader.readAsBinaryString(file);
        }

</script>
<template>
    <div>
        <div class="upload-buttton">
            <el-button type="primary" size="large">
                Upload<el-icon class="el-icon--right"><Upload /></el-icon>
            </el-button>
            <el-button type="primary" size="large">
                Upload<el-icon class="el-icon--right"><Upload /></el-icon>
            </el-button>
            <el-button type="primary" size="large">
                Upload<el-icon class="el-icon--right"><Upload /></el-icon>
            </el-button>
        </div>
        <ImgUpload/>
        <input type="file" class="file" @change="change">
        <button @click="upload">
            上传
        </button>
    </div>
</template>
<style lang="scss" scoped>
    .upload-buttton {
        width: 100wh;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
</style>