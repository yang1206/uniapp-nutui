# Category 商品分类

### 介绍

用于展示商品分类的组件。

### 基础用法

data 数据格式可参考
[categoryData.js](https://storage.360buyimg.com/nutui/3x/categoryData.js)。

```vue
<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { categoryInfo, categoryChild } from './data'

const category = ref([])
const categoryChild = ref([])

onMounted(() => {
  category.value = categoryInfo.category
  categoryChild.value = categoryChild
})

const change = (index: number) => {
  categoryChild.value = [].concat(category.value[index].children)
}

const onChange = () => {
  console.log("当前分类数据")
}
</script>

<template>
  <nut-category :category="category" @change="change">
    <nut-category-pane :categoryChild="categoryChild" @onChange="onChange" />
  </nut-category>
</template>
```

### 自定义分类

```vue
<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { customCategory } from './data'

const customCategoryData = ref([])

onMounted(() => {
  setTimeout(() => {
    customCategoryData.value = customCategory
  }, 500)
})

const changeCustom = () => {
  console.log('点击分类数据')
}
</script>

<template>
  <nut-category @change="changeCustom">
    <nut-category-pane
      type="custom"
      :customCategory="customCategoryData"
      @onChange="changeCustom"
    />
  </nut-category>
</template>
```

## API

### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| type | 分类模式 | string | `classify` / `text` / `custom` | `'classify'` |
| category | 左侧导航栏数据列表 | Array | - | `[]` |

### Events

| 事件名 | 说明 | 类型 |
|------|------|------|
| change | 点击左侧导航栏时触发 | `(index: number) => void` |

### CategoryPane Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| category-child | 右侧展示当前分类数据 | Array | - | `[]` |
| custom-category | 自定义分类数据 | Array | - | `[]` |

### CategoryPane Events

| 事件名 | 说明 | 类型 |
|------|------|------|
| on-change | 点击右侧分类数据触发 | `(item: any) => void` |

### CategoryPane Slots

| 名称 | 说明 |
|------|------|
| default | 自定义内容 |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/components/basic/configprovider)。

| 名称 | 默认值 |
|------|------|
| --nut-category-bg-color | rgba(255, 255, 255, 1) |
| --nut-category-list-left-bg-color | rgba(246, 247, 249, 1) |
| --nut-category-list-item-color | var(--nut-title-color) |
| --nut-category-list-item-checked-color | rgba(255, 255, 255, 1) |
| --nut-category-list-item-checked-img-bg-color | var(--nut-primary-color) |
| --nut-category-pane-gray-color | #666 |
| --nut-category-pane-border-color | rgb(153, 153, 153) |
| --nut-category-pane-title-color | rgba(51, 51, 51, 1) |
