<script setup lang="ts">
import { ref } from 'vue'

const danmu = ref<any>(null)
const list = ref(['画美不看', '不明觉厉', '喜大普奔', '男默女泪', '累觉不爱', '爷青结'])
function addDanmu() {
  const n = Math.random()
  danmu.value.add(`随机——${String(n).substr(2, 10)}`)
}
</script>

<template>
  <div class="demo barrage-demo h-100vh!">
    <h2 class="title">
      基础用法
    </h2>
    <nut-cell custom-class="danmu-box">
      <nut-barrage ref="danmu" :danmu="list" />
    </nut-cell>
    <div class="test">
      <nut-button custom-class="add nut-button--primary" @click="addDanmu">
        随机添加
      </nut-button>
    </div>
  </div>
</template>

<style lang="scss">
.barrage-demo {
  .danmu-box,
  .nut-barrage {
    padding: 20px 0;
    height: 150px;
  }
  .nut-button {
    width: 100%;
  }
}
</style>

<route lang="json">
{
  "style": {
    "navigationBarTitleText": "Barrage"
  }
}
</route>
