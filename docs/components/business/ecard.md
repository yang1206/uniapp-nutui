# Ecard 电子卡

### 介绍

虚拟电子卡选择

### 基础用法

```vue
<script lang="ts" setup>
import { ref } from 'vue'
// `1.7.7` 开始提供 EcardDataItem 类型，之前版本使用 { price: number | string }
import type { EcardDataItem } from 'nutui-uniapp'

const money = ref<number>(0)

const dataList = ref<EcardDataItem[]>([
  { price: 10 },
  { price: 20 },
  { price: 30 },
  { price: 40 }
])
</script>

<template>
  <nut-ecard v-model="money" :list="dataList"></nut-ecard>
</template>
```

### 相关事件

```vue
<script lang="ts" setup>
import { ref } from 'vue'
// `1.7.7` 开始提供 EcardChangeEvent、EcardDataValue 类型
import type { EcardChangeEvent, EcardDataValue, EcardDataItem } from 'nutui-uniapp'

const money = ref<number>(0)
const dataList = ref<EcardDataItem[]>([
  { price: 10 },
  { price: 20 },
  { price: 30 },
  { price: 40 }
])

// `1.7.7` 开始提供 update 事件
function onUpdate(value: EcardDataValue) {
  console.log('updated', value)
}

function onChange(event: EcardChangeEvent) {
  console.log('changed', event)
}

function onInputChange(value: string) {
  console.log('input changed', value)
}

function onStepChange(count: number, price: EcardDataValue) {
  console.log('step changed', count, price)
}

function onInputClick() {
  console.log('input clicked')
}
</script>

<template>
  <nut-ecard v-model="money"
             :list="dataList"
             @update="onUpdate"
             @change="onChange"
             @input-change="onInputChange"
             @change-step="onStepChange"
             @input-click="onInputClick"></nut-ecard>
</template>
```

### 手动更新

> 自 `1.7.7` 开始支持通过 `ref` 手动更新

```vue
<script lang="ts" setup>
import { ref } from 'vue'
import type { EcardInst, EcardDataItem } from 'nutui-uniapp'

const money = ref<number>(0)
const dataList = ref<EcardDataItem[]>([
  { price: 10 },
  { price: 20 },
  { price: 30 },
  { price: 40 }
])

const ecard = ref<EcardInst | null>(null)

// 更新选中项
function updateCurrentIndex() {
  ecard.value?.update({
    index: 1
  })
}

// 更新输入值
function updateInputValue() {
  ecard.value?.update({
    index: -1,
    input: '123'
  })
}

// 更新数量
function updateCount() {
  ecard.value?.update({
    index: 1,
    count: 2
  })
}
</script>

<template>
  <nut-ecard ref="ecard" v-model="money" :list="dataList"></nut-ecard>
</template>
```

## API

### Props

| 参数                 | 说明           | 类型              | 默认值         |
|--------------------|--------------|-----------------|-------------|
| v-model            | 购买电子卡所需价钱    | number \ string | `0`         |
| list               | 电子卡面值预设列表    | EcardDataItem[] | `[]`        |
| choose-text        | 选择面值文案       | string          | 请选择电子卡面值    |
| show-other `1.6.1` | 是否显示其他面值控制   | boolean         | `true`      |
| other-value-text   | 其他面值文案       | string          | 其他面值        |
| placeholder        | 其他面值默认提示语    | string          | 请输入1-5000整数 |
| suffix             | 符号标识         | string          | ¥           |
| card-amount-min    | 其它面值最小值      | number \ string | `1`         |
| card-amount-max    | 其他面值最大值      | number \ string | `9999`      |
| show-step `1.6.1`  | 是否显示是否显示数量步进 | boolean         | `true`      |
| card-buy-min       | 购买数量最小值      | number          | `1`         |
| card-buy-max       | 购买数量最大值      | number          | `9999`      |

### Events

| 事件名            | 说明     | 回调参数          |
|----------------|--------|---------------|
| update `1.7.7` | 合计金额变化 | 合计金额（面值 * 数量） |
| change         | 切换预设面值 | 点击的数据         |
| input-change   | 输入其他面值 | 输入的数据         |
| change-step    | 数量变化   | 当前数量，当前面值     |
| input-click    | 点击输入框  | -             |

### EcardDataItem 数据结构

| 键名    | 说明      | 类型              |
|-------|---------|-----------------|
| price | 每张电子卡价格 | number \ string |

### Exposes

通过 [ref](https://vuejs.org/guide/essentials/template-refs.html#template-refs) 可以获取到 Ecard 实例并调用实例方法

| 方法名            | 说明   | 参数                              | 返回值 |
|----------------|------|---------------------------------|-----|
| update `1.7.7` | 更新面值 | (options: `EcardUpdateOptions`) | -   |

::: details 类型定义 `1.7.7`

```typescript
export interface EcardUpdateOptions {
  /**
   * 选中项（从0开始的索引，-1表示选中输入框，null表示不选中）
   */
  index?: number | null
  /**
   * 其他面值（当index为-1或null时有效）
   */
  input?: string
  /**
   * 数量
   */
  count?: number
}
```

```typescript
export interface EcardInst {
  /**
   * 更新面值
   *
   * @param options 配置项
   */
  update: (options: EcardUpdateOptions) => void
}
```

:::

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/components/basic/configprovider)。

| 名称                   | 默认值     | 描述 |
|----------------------|---------|----|
| --nut-ecard-bg-color | #f0f2f5 | -  |
