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

<template>
  <div class="demo h-100vh!">
    <h2>基础用法</h2>
    <nut-turntable
      ref="turntable"
      class="turntable"
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
    />
  </div>
</template>

<style lang="scss"></style>
