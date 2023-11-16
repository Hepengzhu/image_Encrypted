<script setup>
import { ref } from "vue"
let checkShow = ref(false) //是否显示选择框
const url ='https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'
const srcList = [
    'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
    'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
    'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
    'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
    'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
    'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
    'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg',
    ]
let isPreview = ref(srcList) //是否可预览图片用于选择图片的时候取消预览
// 选择图片的状态控制
const changeImage = ()=>{
  console.log(checkShow);
    checkShow.value = !checkShow.value
    if(checkShow) isPreview.value = []
    else isPreview.value = srcList
}
const checkAll = ref(false)
const isIndeterminate = ref(true)
const checkedSrcList = ref([])

const handleCheckAllChange = (val) => {
  console.log(val);
  checkedSrcList.value = val ? srcList : []
  console.log(checkedSrcList.value);
  isIndeterminate.value = false
}
const handleCheckedSrcListChange = (value) => {
  console.log(value);
  const checkedCount = value.length
  checkAll.value = checkedCount === srcList.length
  isIndeterminate.value = checkedCount > 0 && checkedCount < srcList.length
}
</script>
<!-- hide-on-click-modal=true -->
<template>
    <div class="img">
        <div class="button">
            <el-button size="large" type="primary" >一键解密</el-button>
            <el-button type="info" @click="changeImage" size="large">选中图片</el-button>
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
                <div class="img-card" v-for="(url,index) in srcList" :key="url" >
                    <el-checkbox size="large" :label='url' v-show="checkShow">
                      <template v-slot></template>
                    </el-checkbox>
                    <el-image
                        style="width: 300px; height: 200px"
                        :src="url"  
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