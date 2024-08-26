<script setup lang="ts">
import { computed, defineComponent, reactive, ref } from 'vue'
import { getMainClass, getMainStyle, isH5 } from '../_utils'
import { PREFIX } from '../_constants'
import { useTouch } from '../_hooks'
import { turnswipeEmits, turnswipeProps } from './turnswipe'
import type { TTurnSwipePrizeItem } from './type'

const props = defineProps(turnswipeProps)

const emit = defineEmits(turnswipeEmits)
defineExpose({ rotateTurn, moveTurn })
const {
  width,
  height,
  circleWidth,
  circleHeight,
  turnsNumber,
  turnsTime,
  lockTime,
} = reactive(props)

const prizeList = computed<TTurnSwipePrizeItem[]>(() => {
  return [...props.prizeList, ...props.prizeList.map((item) => {
    return {
      ...item,
      id: `${item.id}__clone`,
    }
  })]
})

const classes = computed(() => {
  return getMainClass(props, componentName)
})

const styles = computed(() => {
  return getMainStyle(props, { width, height })
})

const circleRotate = computed(() => {
  // return `rotate(${-(360 / prizeList.value.length) / 2}deg)`
  return `rotate(0deg)`
})

const circleStyles = computed(() => {
  return getMainStyle(props, { width: circleWidth, height: circleHeight })
})

// const getRandomColor = function () {
//   const r = Math.floor(Math.random() * 256);
//   const g = Math.floor(Math.random() * 256);
//   const b = Math.floor(Math.random() * 256);
//   return "rgb(" + r + "," + g + "," + b + ")";
// };

// 用来锁定转盘，避免同时多次点击转动
const lock = ref(false)
// 是否正在转动
const rorating = ref(false)
// 剩余抽奖次数
// const num = ref(5);
// 开始转动的角度
const startRotateDegree = ref(0)
// 设置指针默认指向的位置,现在是默认指向2个扇形之间的边线上
const rotateAngle = ref<string>('0')
const rotateTransition = ref('')

const turnswipeDom = ref(null)
const touch = useTouch()
const moving = ref(false)

const activeIndex = computed(() => {
  const index = -Math.round(startRotateDegree.value / (360 / prizeList.value.length)) % prizeList.value.length
  return index < 0 ? index + prizeList.value.length : index
})

// 根据index计算每一格要旋转的角度的样式
function getRotateAngle(index: number, flag?: string) {
  const angle = (360 / prizeList.value.length) * index
  return {
    transform: `rotate(${angle}deg)${flag === 'canvas'
    && isH5
        ? ' scale(2)'
        : ''
      }`,
  }
}

// 判断是否可以转动
function canBeRotated() {
  // if (num.value <= 0) {
  //   return false;
  // }
  if (lock.value) {
    if (!rorating.value)
      emit('lockTurns')

    return false
  }
  return true
}

// 转动起来
function changeLock() {
  setTimeout(() => {
    lock.value = false
  }, lockTime * 1000)
}
function rotate(index: number) {
  const turnsTimeNum = turnsTime
  const rotateAngleValue
    = startRotateDegree.value
    + turnsNumber * 360
    + 360
    - (180 / prizeList.value.length + (360 / prizeList.value.length) * index)
    - (startRotateDegree.value % 360)
  startRotateDegree.value = rotateAngleValue
  rotateAngle.value = `rotate(${rotateAngleValue}deg)`
  rotateTransition.value = `transform ${turnsTimeNum}s cubic-bezier(0.250, 0.460, 0.455, 0.995)`
  setTimeout(() => {
    emit('endTurns')
    rorating.value = false
    changeLock()
  }, turnsTimeNum * 1000 + 500)
}

function rotateTurn() {
  // 开始转动
  // 先上锁
  lock.value = true
  rorating.value = true
  setTimeout(() => {
    rotate(props.prizeIndex)
  }, 300)
}

function onTouchStart(event: any) {
  if (!canBeRotated())
    return false

  touch.start(event)
}

async function onTouchMove(event: any) {
  if (!canBeRotated())
    return false

  if (touch.isHorizontal())
    moving.value = true

  touch.move(event)
}

function onTouchEnd() {
  if (!moving.value)
    return false

  moving.value = false

  emit('startTurns', {
    deltaX: touch.deltaX.value,
    deltaY: touch.deltaY.value,
  })
}

function moveBy(index: number) {
  const turnsTimeNum = turnsTime
  const rotateAngleValue
    = startRotateDegree.value
    - ((360 / prizeList.value.length) * index)
  startRotateDegree.value = rotateAngleValue
  rotateAngle.value = `rotate(${rotateAngleValue}deg)`
  rotateTransition.value = `transform ${turnsTimeNum}s cubic-bezier(0.250, 0.460, 0.455, 0.995)`
}

function moveTurn(moveIndex: number) {
  moveBy(moveIndex)
}
</script>

<script lang="ts">
const componentName = `${PREFIX}-turnswipe`

export default defineComponent({
  name: componentName,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})
</script>

<template>
  <view
    ref="turnswipeDom" :class="classes" :style="styles"
    @touchstart="onTouchStart"
    @touchmove="onTouchMove"
    @touchend="onTouchEnd"
    @touchcancel="onTouchEnd"
  >
    <view class="circle" :style="circleStyles">
      <view class="rotate" :style="{ transform: circleRotate }">
        <view class="turnswipe" :style="{ transform: rotateAngle, transition: rotateTransition }">
          <view v-if="prizeList.length > 0" class="prize">
            <view v-for="(item, index) of prizeList" :key="index" class="item" :style="getRotateAngle(index)" :class="[index === activeIndex ? 'active' : '']">
              <view class="drawTable-name">
                {{ item.prizeName }}
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss">
@import './index';
</style>
