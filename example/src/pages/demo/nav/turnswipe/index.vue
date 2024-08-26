<script lang="ts">
import { reactive, ref } from 'vue'

export default {
  setup() {
    const turnswipe = ref()
    // 转盘大小
    const luckWidth = ref('360px')
    const luckheight = ref('120px')
    const circleWidth = ref('520px')
    const circleHeight = ref('520px')
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
        id: 'toy',
        prizeName: '猫猫玩具',
      },
      {
        id: 'nearby',
        prizeName: '附近有猫',
      },
      {
        id: 'main',
        prizeName: '猫猫主粮',
      },
      {
        id: 'snack',
        prizeName: '猫猫零食',
      },
      {
        id: 'health',
        prizeName: '猫猫保健',
      },
      {
        id: 'clean',
        prizeName: '猫猫清洁',
      },
      {
        id: 'daily',
        prizeName: '猫猫日用',
      },
    ])
    // 转动需要持续的时间(秒)
    const turnsTime = ref(1)
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
    // 用来锁定转盘，避免同时多次点击转动
    const lock = ref(false)
    // 剩余抽奖次数
    const num = ref(5)
    const startTurns = (e: any) => {
      const moveIndex = e.deltaX > 0 ? -1 : 1
      turnswipe.value.moveTurn(moveIndex)
    }
    return {
      turnswipe,
      luckWidth,
      luckheight,
      circleWidth,
      circleHeight,
      pointerStyle,
      prizeList,
      turnsTime,
      styleOpt,
      lock,
      num,
      startTurns,
    }
  },
}
</script>

<template>
  <div class="demo h-100vh!">
    <h2>基础用法</h2>
    <nut-turnswipe
      ref="turnswipe"
      class="turnswipe"
      :width="luckWidth"
      :height="luckheight"
      :circle-width="circleWidth"
      :circle-height="circleHeight"
      :prize-list="prizeList"
      :turns-time="turnsTime"
      :style-opt="styleOpt"
      :pointer-style="pointerStyle"
      @start-turns="startTurns"
    />
  </div>
</template>

<style lang="scss"></style>
