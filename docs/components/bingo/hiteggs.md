# Hiteggs 组件

### 介绍

用于砸金蛋抽奖场景，可以自定义金蛋图片等

### 基础用法

```vue
<template>
  <nut-hiteggs></nut-hiteggs>
</template>
```

### 自定义传入个数

```vue
<template>
  <nut-hiteggs :num="9"></nut-hiteggs>
</template>
```

### 砸击事件

```vue
<template>
  <nut-hiteggs :num="9" @click="hit"></nut-hiteggs>
</template>
<script setup>
  const hit = () => {
        console.log("中奖啦");
  };
</script>
```

### Props

| 参数       | 说明             | 类型   | 默认值 |
| ---------- | ---------------- | ------ | ------ |
| num        | 金蛋个数         | number | 9      |
| intact-img | 完整金蛋图片地址 | string | -      |
| hammer     | 锤子图片         | string | -      |
| width      | 金蛋图片宽度     | string | 80px   |
| height     | 金蛋图片高度     | string | 80px   |

### Events

| 事件名 | 说明           | 类型 |
| ------ | -------------- | -------- |
| click  | 砸击金蛋后触发 | () => true        |
