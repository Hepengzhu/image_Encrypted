<script setup>
import axios from "axios"
import { ref,defineProps,onBeforeUnmount  } from "vue"
import {useImageData} from '/src/stores/img.js'
import {useimgDownload} from '/src/hooks'
import { storeToRefs } from "pinia"

// 接收父组件传递的图片内容
const props = defineProps({
  imgList:Object,
  imgType:Object
})

// console.log('aaaaaaaaaaaaaaaaaaaaaaa');
// console.log(props.imgList[0]);
const store = useImageData()
const {checkedSrcList,urlList,encryptionImg} = storeToRefs(store)

let checkShow = ref(false) //是否显示选择框
const url ='https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'


let isPreview = ref(props.imgList.map(item=>item.data)) //是否可预览图片用于选择图片的时候取消预览
// isPreview.value = 
// 选择图片的状态控制
const changeImage = ()=>{
    checkShow.value = !checkShow.value
    isPreview.value = checkShow.value?[]:props.imgList.map(item=>item.data)
}
// 多选
const checkAll = ref(false)
const isIndeterminate = ref(true) //不确定全选的状态
// const checkedSrcList = ref([]) //已选择的数据
// 全选函数
const handleCheckAllChange = (val) => {
  checkedSrcList.value = val ? props.imgList : []
  //console.log(checkedSrcList.value);
  isIndeterminate.value = false
  
}
// 选择时触发的函数
const handleCheckedSrcListChange = (value) => {
  console.log(value);
  const checkedCount = value.length
  checkAll.value = checkedCount === props.imgList.length
  isIndeterminate.value = checkedCount > 0 && checkedCount < props.imgList.length
}


// 切换组件时，清除已选择的内容
onBeforeUnmount(()=>{
  checkedSrcList.value.length = 0
})

</script>
<!-- hide-on-click-modal=true -->
<template>
    <div class="img">
        <div class="button">
            <slot name="button" :changeImage="changeImage"></slot>
            <el-button type="info" @click="changeImage" size="large">{{!checkShow ?'选中图片':'取消选择'}}</el-button>
        </div>
        <div class="demo-image__preview">
            <el-checkbox v-show="checkShow" style="display: block;"
                v-model="checkAll"
                :indeterminate="isIndeterminate"
                @change="handleCheckAllChange"
                >全选</el-checkbox>
              
            <el-checkbox-group
                v-model="checkedSrcList"
                @change="handleCheckedSrcListChange"
            >
                <div class="img-card" v-for="(item,index) in imgList" :key="item" >
                                              <!-- :label=''根据父组件的要求绑定对应的图片 -->
                    <el-checkbox size="large" :label='imgType?imgType[index]:item' v-show="checkShow">
                      <template v-slot></template>
                    </el-checkbox>
                    <el-image
                        style="width: 300px; height: 200px"
                        :src="item.data"  
                        :zoom-rate="1.2"
                        :max-scale="7"
                        :min-scale="0.2"
                        :preview-src-list="isPreview"
                        :initial-index="index"
                        fit="cover"
                    >
                    </el-image>
                </div>
            </el-checkbox-group>

        </div>
        
    </div>
</template>
  
  <style lang='scss' scoped>
  .img {
    margin: 2px auto;
    .img-card {
        position: relative;
        display: inline-block;
        .el-checkbox {
            position: absolute;
            top: -3px;
            right: 2px;
        }
    }
    // 预览图片容器
    .el-image-viewer__canvas{

    }
  }
  .button {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
  }
  .el-image {
    margin-right: 3px;
    margin-top: 5px;
  }
  .demo-image__error .image-slot {
    font-size: 30px;
  }
  .demo-image__error .image-slot .el-icon {
    font-size: 30px;
  }
  .demo-image__error .el-image {
    width: 100%;
    height: 200px;
  }
  </style>