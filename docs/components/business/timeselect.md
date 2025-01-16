# TimeSelect 配送时间

### 介绍

用于配送时间选择

### 基础用法

```vue
<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue';

const visible1 = ref(false);
const currentKey1 = ref(0);
const currentTime1 = ref([]);
const times1 = reactive([
  {
    key: 0,
    list: ['9:00-10:00', '10:00-11:00', '11:00-12:00']
  },
  {
    key: 1,
    list: ['9:00-10:00', '10:00-11:00']
  },
]);

const handleChange1 = (pannelKey: number) => {
  currentKey1.value = pannelKey;
  currentTime1.value = [{
    key: currentKey1.value,
    list: []
  }];
};

const handleClick1 = () => {
  visible1.value = true;
};

const selectTime1 = (item: string) => {
  let curTimeIndex = currentTime1.value[0].list.findIndex((time: string) => time === item);
  if(curTimeIndex === -1) {
    currentTime1.value[0].list.push(item);
  } else {
    currentTime1.value[0].list.splice(curTimeIndex, 1);
  }
};

const handleSelected1 = (obj: any) => {
  console.log(`您选择了：${JSON.stringify(obj)}`);
};

onMounted(() => {
  currentTime1.value.push({
    key: currentKey1.value,
    list: []
  });
});
</script>

<template>
  <nut-cell @click="handleClick1">
    <span><label>请选择配送时间</label></span>
  </nut-cell>
  <nut-time-select
    v-model:visible="visible1"
    height="50%"
    :current-key="currentKey1"
    :current-time="currentTime1"
    @select="handleSelected1"
  >
    <template #pannel>
      <nut-time-pannel name="2月23日(今天)" pannel-key="0" @change="handleChange1"></nut-time-pannel>
      <nut-time-pannel name="2月24日(星期三)" pannel-key="1" @change="handleChange1"></nut-time-pannel>
    </template>
    <template #detail>
      <nut-time-detail :times="times1" @select="selectTime1"></nut-time-detail>
    </template>
  </nut-time-select>
</template>
```

### 可选择多个日期时间

```vue
<script lang="ts" setup>
// ... (省略类似的代码结构)
</script>

<template>
  <!-- ... (省略类似的模板结构) -->
</template>
```

## API

### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| visible | 是否显示弹层 | boolean | - | `false` |
| height | 弹层的高度 | string | - | `20%` |
| title | 弹层标题 | string | - | 取件时间 |
| current-key | 唯一标识 | string / number | - | `0` |
| current-time | 当前选择的时间 | Array | - | `[]` |
| lock-scroll | 背景是否锁定 | boolean | - | `true` |
| muti | 是否可以选择多个时间 | boolean | - | `false` |

### Slots

| 名称 | 说明 |
|------|------|
| title | 更改标题 |
| pannel | 左侧列表 |
| detail | 右侧详细内容 |

### TimePannel Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| name | 显示的名称 | string | - | - |
| pannel-key | 唯一标识 | string / number | - | `0` |

### TimeDetail Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| times | 可选择的时间 | Array | - | `[]` |

### TimeSelect Events

| 事件名 | 说明 | 类型 |
|------|------|------|
| select | 关闭遮罩之后的回调 | `(key: string / number, list: []) => void` |

### TimePannel Events

| 事件名 | 说明 | 类型 |
|------|------|------|
| change | 点击内容的回调 | `(pannelKey: string / number) => void` |

### TimeDetail Events

| 事件名 | 说明 | 类型 |
|------|------|------|
| select | 点击时间的回调 | `(time: string) => void` |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/components/basic/configprovider)。

| 名称 | 默认值 |
|------|------|
| --nut-timeselect-title-font-size | var(--nut-font-size-2) |
| --nut-timeselect-title-color | var(--nut-title-color) |
| --nut-timeselect-title-width | 100% |
| --nut-timeselect-title-height | 50px |
| --nut-timeselect-title-line-height | 50px |
| --nut-timeselect-pannel-bg-color | #f6f7f9 |
| --nut-timeselect-timepannel-text-color | var(--nut-title-color2) |
| --nut-timeselect-timepannel-font-size | var(--nut-font-size-2) |
| --nut-timeselect-timepannel-cur-bg-color | var(--nut-white) |
| --nut-timeselect-timepannel-cur-text-color | #333333 |
| --nut-timeselect-timepannel-width | 140px |
| --nut-timeselect-timepannel-height | 40px |
| --nut-timeselect-timepannel-padding | 15px |
| --nut-timeselect-timedetail-padding | 0 5px 50px 13px |
| --nut-timeselect-timedetail-item-width | 100px |
| --nut-timeselect-timedetail-item-height | 50px |
| --nut-timeselect-timedetail-item-line-height | 50px |
| --nut-timeselect-timedetail-item-bg-color | #f6f7f9 |
| --nut-timeselect-timedetail-item-border-radius | 5px |
| --nut-timeselect-timedetail-item-text-color | #333333 |
| --nut-timeselect-timedetail-item-text-font-size | var(--nut-font-size-2) |
| --nut-timeselect-timedetail-item-cur-bg-color | var(--nut-primary-color) |
| --nut-timeselect-timedetail-item-cur-border | var(--nut-primary-color) |
| --nut-timeselect-timedetail-item-cur-text-color | var(--nut-primary-color) |
