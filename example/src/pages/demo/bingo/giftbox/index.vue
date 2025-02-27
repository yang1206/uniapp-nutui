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

<template>
  <div class="demo h-100vh!">
    <h2 class="title">
      基础用法
    </h2>
    <nut-giftbox
      ref="refChild"
      @start-turns="startTurns"
      @end-turns="endTurns"
    />
    <nut-button
      custom-style="margin-top:10px"
      size="large"
      type="primary"
      @click="initBox"
    >
      再来一次
    </nut-button>
  </div>
</template>

<route lang="json">
{
  "style": {
    "navigationBarTitleText": "GiftBox"
  }
}
</route>
