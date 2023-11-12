import { ref, computed } from 'vue'
import apis from '../api/apis'
import { defineStore } from 'pinia'

export const useImageData = defineStore('img',()=>{
    let formData = new FormData() 
    let imgFiles = ref([])
    // 自定义图片上传
    function uplodImage(files){
        console.log(files);
        let formData = new FormData()
        formData.append(files.name, files, files.name)
        const file = formData.get('upFile')
        const reader = new FileReader()
        reader.onload = (e)=>{
            console.log(e);
            console.log(e.target.result);
        }
        reader.readAsDataURL(files)
    }

    return {
        imgFiles,
        uplodImage
    }
})