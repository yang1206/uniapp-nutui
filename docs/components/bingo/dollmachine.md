# DollMachine 抓娃娃

### 介绍

模拟娃娃机抽奖，可配置图片、开始结束回调等。

### 基础用法

```vue
<template>
  <nut-doll-machine
    ref="lottoRollDom"
    :prize-list="prizeList"
    :prize-index="prizeIndex"
    @start-turns="startTurns"
    @end-turns="endTurns"
  >
  </nut-doll-machine>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

const prizeList = reactive([
  {
    imagePath:
      'https://img11.360buyimg.com/imagetools/jfs/t1/147182/12/2440/6194/5f06cde6Ead240fe8/31082e30a182a5ce.png',
    text: '大鸡腿',
  },
  {
    imagePath:
      'https://img12.360buyimg.com/imagetools/jfs/t1/221361/4/7410/16458/61c9261eE45802396/27b64caa9e7c9bac.png',
    text: 'JOY',
  },
  {
    imagePath:
      'https://img11.360buyimg.com/imagetools/jfs/t1/128607/26/6643/6790/5f06cd27E9b5e15f7/7509bc7ce2da66b8.png',
    text: 'VIP',
  },
  {
    imagePath:
      'https://img12.360buyimg.com/imagetools/jfs/t1/221361/4/7410/16458/61c9261eE45802396/27b64caa9e7c9bac.png',
    text: 'JOY',
  },
])

// 中奖的奖品的index(此数据可根据后台返回的值重新赋值)
const prizeIndex = ref(0)
function startTurns() {
  // eslint-disable-next-line no-console
  console.log('开始抽奖')
}

function endTurns() {
  // eslint-disable-next-line no-console
  console.log('抽奖结束')
}
</script>
```

### Props

| 参数       | 说明     | 类型 | 默认值 |
| ---------- | -------- | ---- | ------ |
| prize-list | 奖品列表 | any[]  | 目前需要至少 4 个奖品 |
| default-claw | 初始化爪子的图片链接     | string | -                     |
| active-claw  | 爪子抓到奖品的图片链接   | string | -                     |
| prize-index  | 中奖奖品在列表的索引位置 | number | -1（-1 未中奖）       |

### Events

| 事件名      | 说明                             | 类型       |
| ----------- | -------------------------------- | ---------- |
| init        | 游戏初始化                       | () => true |
| start-turns | 爪子开始下伸，赋值到 prize-index | () => true |
| end-turns   | 爪子已经抓到/未抓到奖品触发      | () => true |
