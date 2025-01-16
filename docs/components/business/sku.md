# Sku 商品规格选择

### 介绍

常用于进行商品选择

### 基础用法

```vue
<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'

const base = ref(false)
const data = reactive({
  sku: [],
  goods: {}
})

onMounted(() => {
  uni.request({
    url: 'https://storage.360buyimg.com/nutui/3x/data.js',
    success: function (res) {
      const { Sku, Goods } = res.data
      data.sku = Sku
      data.goods = Goods
    }
  })
})

const selectSku = (ss: any) => {
  const { sku, skuIndex, parentSku, parentIndex } = ss
  if (sku.disable) return false
  data.sku[parentIndex].list.forEach((s: any) => {
    s.active = s.id == sku.id
  })
  data.goods = {
    skuId: sku.id,
    price: '4599.00',
    imagePath: '//img14.360buyimg.com/n4/jfs/t1/215845/12/3788/221990/618a5c4dEc71cb4c7/7bd6eb8d17830991.jpg'
  }
}

const clickBtnOperate = (op: string) => {
  console.log('点击了操作按钮', op)
}

const close = () => {
  // 关闭商品规格弹框
}
</script>

<template>
  <nut-cell title="基础用法" desc="" @click="base = true"></nut-cell>
  <nut-sku
    v-model:visible="base"
    :sku="data.sku"
    :goods="data.goods"
    @selectSku="selectSku"
    @clickBtnOperate="clickBtnOperate"
    @close="close"
  ></nut-sku>
</template>
```

### 不可售

```vue
<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'

const notSell = ref(false)
const data = reactive({
  sku: [],
  goods: {}
})
const btnExtraText = ref('抱歉，此商品在所选区域暂无存货')

onMounted(() => {
  uni.request({
    url: 'https://storage.360buyimg.com/nutui/3x/data.js',
    success: function (res) {
      const { Sku, Goods } = res.data
      data.sku = Sku
      data.goods = Goods
    }
  })
})

const changeStepper = (count: number) => {
  console.log('购买数量', count)
}

const selectSku = (ss: any) => {
  const { sku, skuIndex, parentSku, parentIndex } = ss
  if (sku.disable) return false
  data.sku[parentIndex].list.forEach((s: any) => {
    s.active = s.id == sku.id
  })
  data.goods = {
    skuId: sku.id,
    price: '4599.00',
    imagePath: '//img14.360buyimg.com/n4/jfs/t1/216079/14/3895/201095/618a5c0cEe0b9e2ba/cf5b98fb6128a09e.jpg'
  }
}
</script>

<template>
  <nut-cell title="不可售" desc="" @click="notSell = true"></nut-cell>
  <nut-sku
    v-model:visible="notSell"
    :sku="data.sku"
    :goods="data.goods"
    :btnExtraText="btnExtraText"
    @changeStepper="changeStepper"
    @selectSku="selectSku"
    :btnOptions="['buy', 'cart']"
  >
    <template #skuOperate>
      <div class="sku-operate-box">
        <nut-button class="sku-operate-box-dis" type="warning">查看相似商品</nut-button>
        <nut-button class="sku-operate-box-dis" type="info">到货通知</nut-button>
      </div>
    </template>
  </nut-sku>
</template>

<style>
.sku-operate-box {
  width: 100%;
  display: flex;
  padding: 8px 10px;
  box-sizing: border-box;
}
.sku-operate-box-dis {
  flex: 1;
}
.sku-operate-box-dis:first-child {
  margin-right: 18px;
}
</style>
```

### 自定义步进器

可以按照需求配置数字输入框的最大值、最小值、文案等

```vue
<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'

const customStepper = ref(false)
const data = reactive({
  sku: [],
  goods: {}
})

onMounted(() => {
  uni.request({
    url: 'https://storage.360buyimg.com/nutui/3x/data.js',
    success: function (res) {
      const { Sku, Goods } = res.data
      data.sku = Sku
      data.goods = Goods
    }
  })
})

const stepperExtraText = () => {
  return `<div style="width:100%;text-align:right;color:#F00">2件起售</div>`
}

const changeStepper = (count: number) => {
  console.log('购买数量', count)
}

const overLimit = (val: any) => {
  if (val.action == 'reduce') {
    console.log('至少买2件')
  } else {
    console.log('最多买7件')
  }
}

const selectSku = (ss: any) => {
  const { sku, skuIndex, parentSku, parentIndex } = ss
  if (sku.disable) return false
  data.sku[parentIndex].list.forEach((s: any) => {
    s.active = s.id == sku.id
  })
  data.goods = {
    skuId: sku.id,
    price: '4599.00',
    imagePath: '//img14.360buyimg.com/n4/jfs/t1/216079/14/3895/201095/618a5c0cEe0b9e2ba/cf5b98fb6128a09e.jpg'
  }
}

const clickBtnOperate = (op: string) => {
  console.log('点击了操作按钮', op)
}
</script>

<template>
  <nut-cell title="自定义计步器" desc="" @click="customStepper = true"></nut-cell>
  <nut-sku
    v-model:visible="customStepper"
    :sku="data.sku"
    :goods="data.goods"
    :stepperMax="7"
    :stepperMin="2"
    :stepperExtraText="stepperExtraText"
    @changeStepper="changeStepper"
    @overLimit="overLimit"
    :btnOptions="['buy', 'cart']"
    @selectSku="selectSku"
    @clickBtnOperate="clickBtnOperate"
  ></nut-sku>
</template>
```

### sku 数组结构

sku 数组中，每一个数组索引代表一个规格类目。其中，`list` 代表该规格类目下的类目值。每个类目值对象包括：`name`、`id`、`active`(是否选中)、`disable`(是否可选)

```javascript
sku: [{
  id: 1,
  name: '颜色',
  list: [{
    name: '亮黑色',
    id: 100016015112,
    active: true,
    disable: false
  }, {
    name: '釉白色',
    id: 100016015142,
    active: false,
    disable: false
  },
  // ...
  ]
},
// ...
]
```

### API

#### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| v-model:visible | 是否显示商品规格弹框 | boolean | - | `false` |
| sku | 商品 sku 数据 | [] | - | `[]` |
| goods | 商品信息 | object | - | - |
| stepper-max | 设置 inputNumber 最大值 | number / string | - | `99999` |
| stepper-min | 设置 inputNumber 最小值 | number / string | - | `1` |
| btn-options | 底部按钮设置 | ['confirm', 'buy', 'cart'] | - | `['confirm']` |
| btn-extra-text | 按钮上部添加文案，默认为空，有值时显示 | string | - | - |
| stepper-title | 数量选择组件左侧文案 | string | - | 购买数量 |
| stepper-extra-text | InputNumber 与标题之间的文案 | Function / boolean | - | `false` |
| buy-text | 立即购买按钮文案 | string | - | 立即购买 |
| add-cart-text | 加入购物车按钮文案 | string | - | 加入购物车 |
| confirm-text | 确定按钮文案 | string | - | 确定 |

#### Events

| 事件名 | 说明 | 类型 |
|------|------|------|
| select-sku | 切换规格类目时触发 | `(ss: { sku: any; skuIndex: number; parentSku: any; parentIndex: number }) => void` |
| add | InputNumber 点击增加按钮时触发 | `(value: number / object) => void` |
| reduce | InputNumber 点击减少按钮时触发 | `(value: number / object) => void` |
| overLimit | InputNumber 点击不可用的按钮时触发 | `(value: object) => void` |
| change-stepper | 购买变化时触发 | `(value: number) => void` |
| click-btn-operate | 点击底部按钮时触发 | `(value: { type: string; value: string / number }) => void` |
| click-close-icon | 点击左上角关闭 icon 时触发 | `() => void` |
| click-overlay | 点击遮罩时触发 | `() => void` |
| close | 关闭弹层时触发 | `() => void` |

#### Slots

Sku 组件默认划分为若干区域，这些区域都定义成了插槽，可以按照需求进行替换。

| 名称 | 说明 |
|------|------|
| skuHeader | 商品信息展示区，包含商品图片、价格、编号 |
| skuHeaderPrice | 商品信息展示区，价格区域展示 |
| skuHeaderExtra | 商品信息展示区，编号区域展示 |
| skuSelectTop | Sku 展示区上方与商品信息展示区下方区域，无默认展示内容 |
| skuSelect | Sku 展示区 |
| skuStepper | 数量选择区 |
| skuStepperBottom | 数量选择区下方区域 |
| skuOperate | 底部按钮操作区域 |

#### Exposes

通过 [ref](https://vuejs.org/guide/essentials/template-refs.html#template-refs) 可以获取到 Sku 实例并调用实例方法

| 方法名 | 说明 | 类型 |
|------|------|------|
| resetCount | 重置商品数量 | `() => void` |

#### goods 对象结构

```javascript
goods: {
  skuId: '', // 商品信息展示区，商品编号
  price: "0", // 商品信息展示区，商品价格
  imagePath: "", // 商品信息展示区，商品图
}
```

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/components/basic/configprovider)。

| 名称 | 默认值 |
|------|------|
| --nut-sku-item-border | 1px solid var(--nut-primary-color) |
| --nut-sku-item-disable-line | line-through |
| --nut-sku-opetate-bg-default | linear-gradient(90deg, var(--nut-primary-color), var(--nut-primary-color-end) 100%) |
| --nut-sku-item-active-bg | var(--nut-primary-color) |
| --nut-sku-opetate-bg-buy | linear-gradient(135deg,rgba(255, 186, 13, 1) 0%,rgba(255, 195, 13, 1) 69%,rgba(255, 207, 13, 1) 100%) |
| --nut-sku-spec-height | 30px |
| --nut-sku-spec-line-height | var(--nut-sku-spec-height) |
| --nut-sku-spec-font-size | 11px |
| --nut-sku-spec-background | rgba(242, 242, 242, 1) |
| --nut-sku-spec-color | var(--nut-black) |
| --nut-sku-spec-margin-right | 12px |
| --nut-sku-spec-padding | 0 18px |
| --nut-sku-spec-title-font-weight | bold |
| --nut-sku-spec-title-font-size | 13px |
| --nut-sku-spec-title-color | var(--nut-black) |
| --nut-sku-spec-title-margin-bottom | 18px |
| --nut-sku-operate-btn-height | 54px |
| --nut-sku-operate-btn-border-top | 0 |
| --nut-sku-operate-btn-item-height | 40px |
| --nut-sku-operate-btn-item-line-height | var(--nut-sku-operate-btn-item-height) |
| --nut-sku-operate-btn-item-font-size | 15px |
| --nut-sku-operate-btn-item-font-weight | normal |
| --nut-sku-product-img-width | 100px |
| --nut-sku-product-img-height | var(--nut-sku-product-img-width) |
| --nut-sku-product-img-border-radius | 0 |
