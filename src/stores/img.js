import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useImageData = defineStore('img',()=>{
  //已选择的数据，数据来源选择图片组件
  const checkedSrcList = ref([]) 

  // 选择暂时存放即将上传的图片，数据来源上传组件
    let imgFiles = ref([])

    // 已加密的图片，数据来源 后台+上传成功
    let encryptionImg = ref([])

    // 预览图片 -> 原图
    let urlList = ref([])
    // 处理异步读取文件
    function readFileAsDataURL(file) {
        return new Promise((resolve, reject) => {
          var reader = new FileReader();
          reader.onload = function(event) {
            resolve(event.target.result);
          };
          reader.readAsDataURL(file);
        });
      }
    // 自定义图片上传,返回图片base64格式
    async function getImage(files){
        if(files.length === 0) return false
        let imgparms = []
        for (const file of files) {
            try {
                // ****** file.raw 获取 原始 File 对象的方式
              const dataURL = await readFileAsDataURL(file.raw);
              imgparms.push(dataURL);
            } catch (error) {
              console.error('Error reading file:', error);
              // imgparms.push(null);
            }
          }

        return imgparms
        
    }

    return {
        checkedSrcList,
        imgFiles,
        encryptionImg,
        urlList,
        getImage
    }
})