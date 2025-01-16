# AddressList 地址列表

### 介绍

主要用于进行地址列表的展示以及操作。

### 基础用法

```vue
<script lang="ts" setup>
import { ref, reactive } from 'vue'

const data = ref([
  {
    testid: 3,
    testaddressName: '姓名',
    phone: '123****4567',
    defaultAddress: false,
    fullAddress: '北京市通州区测试测试测试测试测试测试测试测试测试'
  },
  {
    testid: 4,
    testaddressName: '姓名',
    phone: '123****4567',
    defaultAddress: true,
    fullAddress: '北京市通州区测试测试测试测试测试测试测试测试测试'
  }
])

const dataOptions = reactive({
  id: 'testid',
  addressDetail: 'testaddressDetail',
  addressName: 'testaddressName'
})

function onItemClick() {
  console.log('Click To Address')
}

function onItemDelClick() {
  console.log('Click To Delete')
}

function onItemEditClick() {
  console.log('Click To Edit')
}
</script>

<template>
  <nut-address-list
    :data="data"
    :options="dataOptions"
    :show-bottom-button="false"
    @click-item="onItemClick"
    @del-icon="onItemDelClick"
    @edit-icon="onItemEditClick"
  />
</template>
```

### 长按功能

```vue
<script lang="ts" setup>
import { ref, reactive } from 'vue'

const data = ref([
  {
    testid: 3,
    testaddressName: '姓名',
    phone: '123****4567',
    defaultAddress: false,
    fullAddress: '北京市通州区测试测试测试测试测试测试测试测试测试'
  },
  {
    testid: 4,
    testaddressName: '姓名',
    phone: '123****4567',
    defaultAddress: true,
    fullAddress: '北京市通州区测试测试测试测试测试测试测试测试测试'
  }
])

const dataOptions = reactive({
  id: 'testid',
  addressDetail: 'testaddressDetail',
  addressName: 'testaddressName'
})

function onItemClick() {
  console.log('Click To Address')
}

function onItemDelClick() {
  console.log('Click To Delete')
}

function onItemEditClick() {
  console.log('Click To Edit')
}

function onItemLongCopyClick() {
  console.log('Click To Copy')
}

function onItemLongSetClick() {
  console.log('Click On Settings')
}

function onItemLongDelClick() {
  console.log('Click To Add')
}
</script>

<template>
  <nut-address-list
    :data="data"
    :options="dataOptions"
    long-press
    :show-bottom-button="false"
    @click-item="onItemClick"
    @del-icon="onItemDelClick"
    @edit-icon="onItemEditClick"
    @long-copy="onItemLongCopyClick"
    @long-set="onItemLongSetClick"
    @long-del="onItemLongDelClick"
  />
</template>
```

### 滑动功能

```vue
<script lang="ts" setup>
import { ref, reactive } from 'vue'

const data = ref([
  {
    testid: 3,
    testaddressName: '姓名',
    phone: '123****4567',
    defaultAddress: false,
    fullAddress: '北京市通州区测试测试测试测试测试测试测试测试测试'
  },
  {
    testid: 4,
    testaddressName: '姓名',
    phone: '123****4567',
    defaultAddress: true,
    fullAddress: '北京市通州区测试测试测试测试测试测试测试测试测试'
  }
])

const dataOptions = reactive({
  id: 'testid',
  addressDetail: 'testaddressDetail',
  addressName: 'testaddressName'
})

function onItemClick() {
  console.log('Click To Address')
}

function onItemDelClick() {
  console.log('Click To Delete')
}

function onItemEditClick() {
  console.log('Click To Edit')
}

function onItemSwipeDelClick() {
  console.log('Click On DelClickSwipe')
}

function onAddressAddClick() {
  console.log('Click To Add')
}
</script>

<template>
  <nut-address-list
    :data="data"
    :options="dataOptions"
    swipe-edition
    show-bottom-button
    @click-item="onItemClick"
    @del-icon="onItemDelClick"
    @edit-icon="onItemEditClick"
    @swipe-del="onItemSwipeDelClick"
    @add="onAddressAddClick"
  />
</template>
```

### 使用插槽

::: warning 注意
由于uniapp内部缺陷，目前在小程序端使用嵌套插槽时，无论是否使用作用域参数，必须显式写出才能正常展示插槽内容
:::

```vue
<script lang="ts" setup>
import { ref } from 'vue'

const data = ref([])

function onItemRefreshClick(item: any) {
  console.log('Refresh clicked', item)
}
</script>

<template>
  <nut-address-list :data="data">
    <template #itemIcon="{ item }">
      <nut-icon name="refresh" @click="onItemRefreshClick(item)" />
    </template>

    <template #itemAddr="{ item }">
      <text>这里我不使用item参数，但是也要写出来才可以~</text>
    </template>
  </nut-address-list>
</template>
```

## API

### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| data | 地址数组 | Array | - | `[]` |
| long-press | 长按功能 | boolean | - | `false` |
| swipe-edition | 右滑功能 | boolean | - | `false` |
| show-bottom-button | 是否展示底部按钮 | boolean | - | `true` |
| options | 自定义 `key` 值时，设置映射关系 | object | - | - |

### Events

| 事件名 | 说明 | 类型 |
|------|------|------|
| del-icon | 点击删除图标 | `(event: Event, item: object, index: number) => void` |
| edit-icon | 点击编辑图标 | `(event: Event, item: object, index: number) => void` |
| click-item | 点击地址列表每一项 | `(event: Event, item: object, index: number) => void` |
| add | 点击底部添加地址按钮 | `(event: Event) => void` |
| long-copy | 点击复制地址按钮 | `(event: Event, item: object, index: number) => void` |
| long-set | 点击设置默认按钮 | `(event: Event, item: object, index: number) => void` |
| long-del | 点击删除地址按钮 | `(event: Event, item: object, index: number) => void` |
| swipe-del | 默认右滑删除按钮 | `(event: Event, item: object, index: number) => void` |

### Slots

`AddressList` 组件默认划分为若干区域，这些区域都定义成了插槽，可以按照需求进行替换

| 名称 | 说明 | 类型 | 子标签 |
|------|------|------|------|
| itemInfos | 地址列表项姓名/联系方式/默认一行 | `{ item: object }` | - |
| itemIcon | 地址列表项图标 | `{ item: object }` | - |
| itemAddr | 地址列表项详细地址 | `{ item: object }` | - |
| swipeRight | 地址列表项右滑区域 | `{ item: object }` | - |
| longpressBtns | 地址列表项长按遮罩内容 | `{ item: object }` | - |

### data 数组中每一项 与 options 对象的参数磨平

下面是 `data` 数组中每一项 基础数据结构

```javascript
const dataInfo = {
  id: 2, // 地址id
  addressName: '姓名', // 地址姓名
  phone: '123****4567', // 联系方式
  defaultAddress: false, // 是否是默认
  fullAddress: '北京市通州区测试测试测试测试测试测试测试测试测试' // 详细地址
}
```

组件内优先获取基础数据结构中定义的字段，若想自定义 `key` 值，可以通过 `options` 设置映射关系

```javascript
const dataOptions = {
  id: 'testid',
  addressDetail: 'testaddressDetail',
  addressName: 'testaddressName',
}
```

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/components/basic/configprovider)。

| 名称 | 默认值 |
|------|------|
| --nut-addresslist-bg | #fff |
| --nut-addresslist-border | #f0f0f0 |
| --nut-addresslist-font-color | #333333 |
| --nut-addresslist-font-size | 16px |
| --nut-addresslist-mask-bg | rgba(0, 0, 0, 0.4) |
| --nut-addresslist-addr-font-color | #666666 |
| --nut-addresslist-addr-font-size | 12px |
| --nut-addresslist-set-bg | #f5a623 |
| --nut-addresslist-del-bg | #e1251b |
| --nut-addresslist-contnts-contact-default | var(--nut-primary-color) |
| --nut-addresslist-contnts-contact-color | var(--nut-white) |
