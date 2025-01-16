<script setup lang="ts">
import { onMounted, reactive } from 'vue'

const state = reactive({
  visible1: false,
  currentKey1: 0,
  currentTime1: [] as any[],
  times1: [
    {
      key: 0,
      list: ['9:00-10:00', '10:00-11:00', '11:00-12:00'],
    },
    {
      key: 1,
      list: ['9:00-10:00', '10:00-11:00'],
    },
  ],
  visible2: false,
  currentKey2: 0,
  currentTime2: [] as any[],
  times2: [
    {
      key: 0,
      list: ['9:00-10:00', '10:00-11:00', '11:00-12:00'],
    },
    {
      key: 1,
      list: ['9:00-10:00', '10:00-11:00'],
    },
  ],
  visible3: false,
})

const toastState = reactive({
  msg: 'toast',
  type: 'text',
  show: false,
  cover: false,
})

function handleChange1(pannelKey: number | string) {
  state.currentKey1 = +pannelKey
  state.currentTime1 = []
  state.currentTime1.push({
    key: state.currentKey1,
    list: [],
  })
}

function handleClick1() {
  state.visible1 = true
}

function selectTime1(item: string) {
  const curTimeIndex = state.currentTime1[0].list.findIndex((time: string) => time === item)
  if (curTimeIndex === -1)
    state.currentTime1[0].list.push(item)
  else
    state.currentTime1[0].list.splice(curTimeIndex, 1)
}

function handleSelected1(obj: any) {
  toastState.show = true
  toastState.msg = JSON.stringify(obj)
  toastState.type = 'text'
  toastState.cover = false
}

function handleChange2(pannelKey: number | string) {
  state.currentKey2 = +pannelKey
  /* eslint-disable eqeqeq */

  const curTime = state.currentTime2.find((item: any) => item.key == pannelKey)
  if (!curTime) {
    state.currentTime2.push({
      key: pannelKey,
      list: [],
    })
  }
}

function handleClick2() {
  state.visible2 = true
}

function selectTime2(item: string) {
  const findIndex = state.currentTime2.findIndex((item: any) => item.key == state.currentKey2)
  const curTimeIndex = state.currentTime2[findIndex].list.findIndex((time: string) => time === item)
  if (curTimeIndex === -1)
    state.currentTime2[findIndex].list.push(item)
  else
    state.currentTime2[findIndex].list.splice(curTimeIndex, 1)
}

function handleSelected2(obj: any) {
  toastState.show = true
  toastState.msg = JSON.stringify(obj)
  toastState.type = 'text'
  toastState.cover = false
}

function handleClick3() {
  state.visible3 = true
}

onMounted(() => {
  state.currentTime1.push({
    key: state.currentKey1,
    list: [],
  })
  state.currentTime2.push({
    key: state.currentKey2,
    list: [],
  })
})
</script>

<template>
  <div class="demo h-100vh!">
    <h2 class="title">
      基础用法
    </h2>
    <nut-cell @click="handleClick1">
      <span><label>请选择配送时间</label></span>
    </nut-cell>
    <nut-time-select
      v-model:visible="state.visible1"
      height="50%"
      :current-key="state.currentKey1"
      :current-time="state.currentTime1"
      @select="handleSelected1"
    >
      <template #pannel>
        <nut-time-pannel name="2月23日(今天)" pannel-key="0" @change="handleChange1" />
        <nut-time-pannel name="2月24日(星期三)" pannel-key="1" @change="handleChange1" />
      </template>
      <template #detail>
        <nut-time-detail :times="state.times1" @select="selectTime1" />
      </template>
    </nut-time-select>
    <h2 class="title">
      可选择多个日期时间
    </h2>
    <nut-cell @click="handleClick2">
      <span><label>请选择配送时间</label></span>
    </nut-cell>
    <nut-time-select
      v-model:visible="state.visible2"
      height="50%"
      :current-key="state.currentKey2"
      :current-time="state.currentTime2"
      @select="handleSelected2"
    >
      <template #pannel>
        <nut-time-pannel name="2月23日(今天)" pannel-key="0" @change="handleChange2" />
        <nut-time-pannel name="2月24日(星期三)" pannel-key="1" @change="handleChange2" />
      </template>
      <template #detail>
        <nut-time-detail :times="state.times2" @select="selectTime2" />
      </template>
    </nut-time-select>
    <h2 class="title">
      更改标题
    </h2>
    <nut-cell @click="handleClick3">
      <span><label>请选择配送时间</label></span>
    </nut-cell>
    <nut-time-select
      v-model:visible="state.visible3"
      height="50%"
      :current-key="state.currentKey2"
      :current-time="state.currentTime2"
      @select="handleSelected2"
    >
      <template #title>
        <div class="timeselect-title">
          <text class="title">
            我是标题
          </text>
          <text class="subtitle">
            我是副标题
          </text>
        </div>
      </template>
      <template #pannel>
        <nut-time-pannel name="2月23日(今天)" pannel-key="0" @change="handleChange2" />
        <nut-time-pannel name="2月24日(星期三)" pannel-key="1" @change="handleChange2" />
      </template>
      <template #detail>
        <nut-time-detail :times="state.times2" @select="selectTime2" />
      </template>
    </nut-time-select>
    <nut-toast
      v-model:visible="toastState.show"
      :msg="toastState.msg"
      :type="toastState.type as any"
      :cover="toastState.cover"
    />
  </div>
</template>

<style lang="scss">
.timeselect-title {
  height: 50px;
  text {
    line-height: 1;
    padding: 0;
    margin: 0;
    &.title {
      margin: 10px 0;
      font-size: 16px;
      font-weight: bold;
    }
    &.subtitle {
      color: #999;
    }
  }
}
</style>

<route lang="json">
{
  "style": {
    "navigationBarTitleText": "TimeSelect"
  }
}
</route>
