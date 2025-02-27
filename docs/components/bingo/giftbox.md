# GiftBox 神秘大礼盒

### 介绍

用于礼盒抽奖，可配置图片、开始结束回调等。

### 基础用法

```vue
<template>
  <nut-giftbox
    ref="refChild"
    @start-turns="startTurns"
    @end-turns="endTurns"
  >
  </nut-giftbox>
  <div @click="initBox">再来一次</div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const refChild = ref()
function initBox() {
  refChild.value.init()
}
function startTurns() {
  uni.showToast({
    title: '开始抽奖',
    icon: 'none',
  })
}
function endTurns() {
  uni.showToast({
    title: '恭喜你中奖了',
    icon: 'success',
  })
}
</script>
```

### Events

| 事件名      | 说明                   | 类型 |
| ----------- | ---------------------- | -------- |
| start-turns | 礼盒打开时候的回调函数 | () => true        |
| end-turns   | 礼盒打开后的回调函数   | () => true        |

### Exposes

| 方法名 | 说明         | 类型      |
| ------ | ------------ | --------- |
| init  | 礼盒初始化 | ()=> void |
