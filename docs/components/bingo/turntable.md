# Turntable 转盘抽奖  <Badge type="warning">H5</Badge>

### 介绍

用于大转盘滚动抽奖场景，可配置奖品、图片、转盘样式等。

### 基础用法

```vue
<template>
  <nut-turntable
    class="turntable"
    ref="turntable"
    :width="luckWidth"
    :height="luckheight"
    :prize-list="prizeList"
    :turns-number="turnsNumber"
    :turns-time="turnsTime"
    :prize-index="prizeIndex"
    :style-opt="styleOpt"
    :pointer-style="pointerStyle"
    @start-turns="startTurns"
    @end-turns="endTurns"
  >
  </nut-turntable>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'

const turntable = ref()
// 转盘大小
const luckWidth = ref('300px')
const luckheight = ref('300px')
// 转盘指针图片样式
const pointerStyle = {
  width: '80px',
  height: '80px',
  backgroundImage:
    'url("https://img11.360buyimg.com/imagetools/jfs/t1/89512/11/15244/137408/5e6f15edEf57fa3ff/cb57747119b3bf89.png")',
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
}
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
// 转动圈数
const turnsNumber = ref(5)
// 转动需要持续的时间(秒)
const turnsTime = ref(5)
// 转盘样式的选项
const styleOpt = reactive({
  // 转盘中每一块扇形的背景色,根据奖品的index来取每一块的对应颜色
  prizeBgColors: [
    'rgb(255, 231, 149)',
    'rgb(255, 247, 223)',
    'rgb(255, 231, 149)',
    'rgb(255, 247, 223)',
    'rgb(255, 231, 149)',
    'rgb(255, 247, 223)',
  ],
  // 每一个扇形的外边框颜色
  borderColor: '#ff9800',
})
// 中奖的奖品的index(此数据可根据后台返回的值重新赋值)
const prizeIndex = ref(-1)

function startTurns() {
  const index = Math.floor(Math.random() * prizeList.value.length)
  prizeIndex.value = index
  turntable.value.rotateTurn()
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

| 参数               | 说明                                                                                      | 类型   | 默认值                                |
| ------------------ | ----------------------------------------------------------------------------------------- | ------ | ------------------------------------- |
| width              | 转盘的宽度                                                                                | string | 300px                                 |
| height             | 转盘的高度                                                                                | string | 300px                                 |
| prize-list         | 奖品列表                                                                                  | TPrizeItem[]  | -                                     |
| turns-number       | 转动的圈数                                                                                | number | 5                                     |
| turns-time         | 从开始转动到结束所用时间                                                                  | number | 5(单位是秒)                           |
| prize-index        | 中奖奖品在列表的索引位置                                                                  | number | -1                                    |
| lock-time `v1.0.6` | 下次抽奖的间隔时间                                                                        | number | 0(单位是秒)                           |
| style-opt          | 转盘中的样式，包括每个扇区的背景颜色(在每条数据中页可单独设置 prizeColor)，扇区的边框颜色 | Record<string, CSSProperties> | `{prizeBgColors: [],borderColor: ''}` |
| pointer-style      | 转盘中指针的样式，包括背景图片、大小等                                                    | CSSProperties | `{width: '80px',height: '80px'}`      |

### Events

| 事件名                | 说明                                                               | 类型 |
| --------------------- | ------------------------------------------------------------------ | -------- |
| rotate-turns `1.0.6` | 开始滚动，手动触发                                                 | () => true        |
| start-turns           | 转盘开始转动的回调函数，此时将接口中的中奖索引，赋值到 prize-index | () => true        |
| end-turns             | 转盘中停止转动后的回调函数                                         | () => true       |
| lock-turns `1.0.6`   | 禁止抽奖时回调函数                                                 | () => true        |
