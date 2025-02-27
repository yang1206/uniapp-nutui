# Marquee 跑马灯

### 介绍

用于跑马灯抽奖场景，可配置奖品、图片等。

### 基础用法

```vue
<template>
  <nut-marquee
    :prize-list="prizeList"
    :prize-index="prizeIndex"
    :speed="100"
    :circle="40"
    :style-opt="styleOpt"
    @start-turns="startTurns"
    @end-turns="endTurns"
  >
  </nut-marquee>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'

// 转盘上要展示的奖品数据
const prizeList = ref([
  {
    id: 'xiaomi',
    prizeName: '小米手机',
    prizeImg:
      'https://img14.360buyimg.com/imagetools/jfs/t1/104165/34/15186/96522/5e6f1435E46bc0cb0/d4e878a15bfd9362.png',
  },
  {
    id: 'blue',
    prizeColor: 'rgb(251, 219, 216)',
    prizeName: '蓝牙耳机',
    prizeImg:
      'https://img13.360buyimg.com/imagetools/jfs/t1/91864/11/15108/139003/5e6f146dE1c7b511d/1ddc5aa6e502060a.jpg',
  },
  {
    id: 'thanks',
    prizeName: '谢谢参与',
    prizeImg:
      'https://img11.360buyimg.com/imagetools/jfs/t1/96116/38/15085/5181/5e6f15d1E48e31d30/71353b61dff705d4.png',
  },
  {
    id: 'apple',
    prizeName: 'apple watch',
    prizeImg:
      'https://img11.360buyimg.com/imagetools/jfs/t1/105385/19/15140/111093/5e6f1506E48bd0dfb/829a98a8cdb4c27f.png',
  },
  {
    id: 'fruit',
    prizeColor: 'rgba(246, 142, 46, 0.5)',
    prizeName: '迪士尼苹果',
    prizeImg:
      'https://img11.360buyimg.com/imagetools/jfs/t1/108308/11/8890/237603/5e6f157eE489cccf1/26e0437cfd93b9c8.png',
  },
  {
    id: 'thanks',
    prizeName: '谢谢参与',
    prizeImg:
      'https://img11.360buyimg.com/imagetools/jfs/t1/96116/38/15085/5181/5e6f15d1E48e31d30/71353b61dff705d4.png',
  },
  {
    id: 'fish',
    prizeName: '海鲜套餐',
    prizeImg:
      'https://img14.360buyimg.com/imagetools/jfs/t1/90507/38/15165/448364/5e6f15b4E5df0c718/4bd4c3d375eec312.png',
  },
  {
    id: 'thanks',
    prizeName: '谢谢参与',
    prizeImg:
      'https://img11.360buyimg.com/imagetools/jfs/t1/96116/38/15085/5181/5e6f15d1E48e31d30/71353b61dff705d4.png',
  },
])
// 转盘样式的选项
const styleOpt = reactive({
  // 转盘中每一块扇形的背景色,根据奖品的index来取每一块的对应颜色
  prizeItem: {},
  startStyle: {},
  contentBg: {
    background: 'rgb(255, 231, 149)',
  },
})
// 中奖的奖品的index(此数据可根据后台返回的值重新赋值)
const prizeIndex = ref(0)
function startTurns() {
  const index = Math.floor(Math.random() * prizeList.value.length)
  prizeIndex.value = index
}
function endTurns() {
  uni.showToast({
    title: '中奖了',
    icon: 'success',
    duration: 2000,
  })
}
</script>
```

### Props

| 参数        | 说明                                                                                  | 类型    | 默认值                                      |
| ----------- | ------------------------------------------------------------------------------------- | ------- | ------------------------------------------- |
| prize-list  | 奖品列表                                                                              | any[]   | []                                          |
| prize-index | 中奖奖品在列表的索引位置                                                              | number  | -1                                          |
| speed       | 转动速度                                                                              | number  | 150                                         |
| circle      | 转动圈数                                                                              | number  | 30                                          |
| disabled    | 是否禁用开始抽奖点击数                                                                | boolean | false                                       |
| style-opt   | 跑马灯中的样式：bgStyle-整个容器样式，itemStyle-每个奖品样式，startStyle-中间按钮样式 | Record<string, CSSProperties>  | `{bgStyle: {},itemStyle: {},startStyle:{}}` |

### Events

| 事件名      | 说明                                                           | 类型 |
| ----------- | -------------------------------------------------------------- | -------- |
| start-turns | 开始跑动的回调函数，此时将接口中的中奖索引，赋值到 prize-index | () => true        |
| end-turns   | 停止跑动后的回调函数                                           | () => true        |
| click   | 点击回调函数                                           | () => true        |
