# SafeArea 安全区 <Badge>v1.5.8</Badge>

### 介绍

在全面屏下提供自适应的边距调整。当网页被全屏展示时，可借助安全区实现自动适配。

### 基础用法

```vue
<template>
  <div class="demo full">
    <h2 class="title">
      基础用法
    </h2>
    <div>
      {{ generateRandomTextArray(900).join(' ') }}
    </div>
    <nut-safe-area position="bottom" />
  </div>
</template>

<script setup lang="ts">
function generateRandomTextArray(count: number) {
  const characters = 'abcdefghijklmnopqrstuvwxyz'
  const textArray = []
  for (let j = 0; j < count; j++) {
    const randomLength = Math.floor(Math.random() * 5) + 4 // 随机生成长度在4到8之间的数
    let randomText = ''
    for (let i = 0; i < randomLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length)
      randomText += characters.charAt(randomIndex)
    }
    textArray.push(randomText)
  }
  return textArray
}
</script>
```

## SafeArea

### Props

| 参数     | 说明         | 类型   | 可选值          | 默认值 |
| -------- | ------------ | ------ | --------------- | ------ |
| position | 安全区的位置 | string | `left`/`bottom` | `-`    |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考  [ConfigProvider 组件](/components/basic/configprovider)。

| 名称                       | 说明       | 默认值 |
| -------------------------- | ---------- | ------ |
| --nutui-safe-area-multiple | 显示的倍数 | `1`    |
