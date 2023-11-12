import { ref, computed } from 'vue'
import apis from '../api/apis'
import { defineStore } from 'pinia'

export const useImageData = defineStore('img',()=>{
    let formData = new FormData() 
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
    // 自定义图片上传
    async function uplodImage(files){
        console.log(files);
        if(files.length === 0) return
        // let formData = new FormData()
        // formData.append(files.name, files, files.name)
        // const file = formData.get(files.name)
        let imgparms = []
        for (const file of files) {
            try {
              const dataURL = await readFileAsDataURL(file.raw);
              imgparms.push(dataURL);
            } catch (error) {
              console.error('Error reading file:', error);
              imgparms.push(null);
            }
          }

        // for(let i = 0;i<files.length;i++){
        //     const reader = new FileReader()
        //     reader.onload = (e)=>{
        //         console.log(e);
        //         console.log(e.target.result);
        //         imgparms.push(e.target.result)
        //     }
        //     reader.readAsDataURL(files[i].raw)
        // }
        return imgparms
        
    }

    return {
        imgFiles,
        uplodImage
    }
})