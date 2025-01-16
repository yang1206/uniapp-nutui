<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useAppStore } from '@/store'

const { darkMode } = useAppStore()
/* eslint-disable no-console */

const demoSignUrl = ref('')
const demoSignUrl2 = ref('')
const state = reactive({
  lineWidth: 4,
  strokeStyle: 'green',
  testimg: '',
})
function clear() {
  demoSignUrl.value = ''
  console.log('清除事件')
}
function clear2() {
  demoSignUrl2.value = ''
  console.log('清除事件')
}
function confirm(canvas: any, data: any) {
  if (data === '') {
    console.log(canvas)
    return false
  }
  demoSignUrl.value = data
  console.log('图片地址', canvas, data)
}
function confirm2(canvas: any, data: any) {
  if (data === '') {
    console.log(canvas)
    return false
  }
  demoSignUrl2.value = data
  console.log('图片地址', canvas, data)
}
function start() {
  console.log('签名开始')
}
function signing(e: any) {
  console.log('签名进行中', e)
}
function end() {
  console.log('签名结束')
}
</script>

<template>
  <div class="demo signature-demo">
    <h2 class="title">
      基础用法
    </h2>
    <nut-signature
      :stroke-style="darkMode ? 'white' : '#111'"
      custom-class="test"
      @confirm="confirm"
      @clear="clear"
      @start="start"
    />
    <image v-if="demoSignUrl" :src="demoSignUrl" class="demoSignUrl" />

    <h2 class="title">
      修改颜色和签字粗细
    </h2>
    <nut-signature
      :line-width="state.lineWidth"
      :stroke-style="state.strokeStyle"
      @confirm="confirm2"
      @clear="clear2"
      @start="start"
      @signing="signing"
      @end="end"
    />
    <image v-if="demoSignUrl2" :src="demoSignUrl2" class="demoSignUrl" />
  </div>
</template>

<style lang="scss">
#app .signature-demo {
  height: 100vh;
}
.test {
  .nut-input {
    width: 80%;
  }
}
#spcanvas {
  height: 400px;
}
.demoSignUrl {
  width: 100px;
  height: 100px;
}
.demo-tips {
  margin-top: 10px;
}
</style>

<route lang="json">
{
  "style": {
    "navigationBarTitleText": "Signature"
  }
}
</route>
