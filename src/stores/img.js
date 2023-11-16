import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useImageData = defineStore('img',()=>{
    let imgFiles = ref([])

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
        console.log(files);
        if(files.length === 0) return false
        let imgparms = []
        for (const file of files) {
            try {
                // ****** file.raw 获取 原始 File 对象的方式
              const dataURL = await readFileAsDataURL(file.raw);
              imgparms.push(dataURL);
            } catch (error) {
              console.error('Error reading file:', error);
              imgparms.push(null);
            }
          }

        return imgparms
        
    }

    return {
        imgFiles,
        getImage
    }
})