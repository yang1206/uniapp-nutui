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

<template>
  <div class="demo h-100vh!">
    <h2 class="title">
      基础用法
    </h2>
    <div class="show-demo">
      <nut-doll-machine
        :prize-list="prizeList"
        :prize-index="prizeIndex"
        @start-turns="startTurns"
        @end-turns="endTurns"
      />
    </div>
  </div>
</template>

<style lang="scss">
page .demo,
#app .demo {
  padding: 0;
}
.show-demo {
  background: #ffffff;
}
.title {
  padding: 0 20px;
}
</style>

<route lang="json">
{
  "style": {
    "navigationBarTitleText": "DollMachine"
  }
}
</route>
