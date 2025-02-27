# Signature 签名

### 介绍

基于 Canvas 的签名组件。默认竖屏模式使用，如使用横屏模式，请开发者自行设置旋转角度或者宽高。

### 基础用法

```vue
<script lang="ts" setup>
import { ref } from 'vue'

const demoSignUrl = ref('')

const confirm = (canvas: any, data: string) => {
  if (data === '') {
    console.log(canvas)
    return false
  }
  demoSignUrl.value = data
  console.log('图片地址', canvas, data)
}

const clear = () => {
  demoSignUrl.value = ''
  console.log('清除事件')
}
</script>

<template>
  <nut-signature
    @confirm="confirm"
    @clear="clear"
  />
  <image v-if="demoSignUrl" :src="demoSignUrl" class="demoSignUrl" />
</template>
```

### 修改颜色和签字粗细

```vue
<script lang="ts" setup>
import { ref } from 'vue'

const lineWidth = ref(4)
const strokeStyle = ref('green')
const demoSignUrl = ref('')
const confirm = (canvas: any, data: string) => {
  if (data === '') {
    console.log(canvas)
    return false
  }
  demoSignUrl.value = data
  console.log('图片地址', canvas, data)
}

const clear = () => {
  demoSignUrl.value = ''
  console.log('清除事件')
}
</script>

<template>
  <nut-signature
    :line-width="lineWidth"
    :stroke-style="strokeStyle"
    @confirm="confirm"
    @clear="clear"
  />
  <image v-if="demoSignUrl" :src="demoSignUrl" class="demoSignUrl" />
</template>
```

## API

### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| line-width | 线条的宽度 | number | - | `2` |
| stroke-style | 绘图笔触颜色 | string | - | `'#000'` |
| type | 图片格式 | string | - | `'png'` |
| un-support-tpl | 不支持Canvas情况下的展示文案 | string | - | - |

### Events

| 事件名 | 说明 | 类型 |
|------|------|------|
| start | 签名开始回调函数（指某次笔画的开始） | `() => void` |
| signing | 正在签名的回调函数（指某次笔画进行中） | `(event: Event) => void` |
| end | 签名结束回调函数（指某次笔画的结束） | `() => void` |
| confirm | 点击确认按钮触发事件回调函数 | `(canvas: any, filePath?: string) => void` |
| clear | 点击重签按钮触发事件回调函数 | `() => void` |
