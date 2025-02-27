# Card 商品卡片

### 介绍

商品卡片，用于展示商品的图片、价格等信息

### 基础用法

```vue
<script lang="ts" setup>
import { reactive } from 'vue'

const state = reactive({
  imgUrl: '//img10.360buyimg.com/n2/s240x240_jfs/t1/210890/22/4728/163829/6163a590Eb7c6f4b5/6390526d49791cb9.jpg!q70.jpg',
  title: '活蟹】湖塘煙雨 阳澄湖大闸蟹公4.5两 母3.5两 4对8只 鲜活生鲜螃蟹现货水产礼盒海鲜水',
  price: '388',
  vipPrice: '378',
  shopDesc: '自营',
  delivery: '厂商配送',
  shopName: '阳澄湖大闸蟹自营店>'
})
</script>

<template>
  <nut-card
    :img-url="state.imgUrl"
    :title="state.title"
    :price="state.price"
    :vipPrice="state.vipPrice"
    :shopDesc="state.shopDesc"
    :delivery="state.delivery"
    :shopName="state.shopName"
  />
</template>
```

### 自定义商品标签

```vue
<script lang="ts" setup>
import { reactive } from 'vue'

const state = reactive({
  imgUrl: '//img10.360buyimg.com/n2/s240x240_jfs/t1/210890/22/4728/163829/6163a590Eb7c6f4b5/6390526d49791cb9.jpg!q70.jpg',
  title: '活蟹】湖塘煙雨 阳澄湖大闸蟹公4.5两 母3.5两 4对8只 鲜活生鲜螃蟹现货水产礼盒海鲜水',
  price: '388',
  vipPrice: '378',
  shopDesc: '自营',
  delivery: '厂商配送',
  shopName: '阳澄湖大闸蟹自营店>'
})
</script>

<template>
  <nut-card
    :img-url="state.imgUrl"
    :title="state.title"
    :price="state.price"
    :vipPrice="state.vipPrice"
    :shopDesc="state.shopDesc"
    :delivery="state.delivery"
    :shopName="state.shopName"
  >
    <template #prolist>
      <div class="search_prolist_attr">
        <span class="word">活鲜</span>
        <span class="word">礼盒</span>
        <span class="word">国产</span>
      </div>
    </template>
  </nut-card>
</template>

<style lang="scss">
.search_prolist_attr {
  margin: 3px 0 1px;
  height: 15px;
  overflow: hidden;
  > span {
    float: left;
    padding: 0 5px;
    border-radius: 1px;
    font-size: 10px;
    height: 15px;
    line-height: 15px;
    color: #999;
    background-color: #f2f2f7;
    margin-right: 5px;
  }
}
</style>
```

### 自定义店铺介绍

```vue
<script lang="ts" setup>
import { reactive } from 'vue'

const state = reactive({
  imgUrl: '//img10.360buyimg.com/n2/s240x240_jfs/t1/210890/22/4728/163829/6163a590Eb7c6f4b5/6390526d49791cb9.jpg!q70.jpg',
  title: '活蟹】湖塘煙雨 阳澄湖大闸蟹公4.5两 母3.5两 4对8只 鲜活生鲜螃蟹现货水产礼盒海鲜水',
  price: '388',
  vipPrice: '378',
  shopDesc: '自营',
  delivery: '厂商配送',
  shopName: '阳澄湖大闸蟹自营店>'
})
</script>

<template>
  <nut-card
    :img-url="state.imgUrl"
    :title="state.title"
    :price="state.price"
    :vipPrice="state.vipPrice"
    :shopDesc="state.shopDesc"
    :delivery="state.delivery"
    :shopName="state.shopName"
  >
    <template #shopTag>
      <div>自定义店铺介绍</div>
    </template>
    <template #price>
      <span>询价</span>
    </template>
    <template #origin>
      <img
        class="tag"
        src="https://img11.360buyimg.com/jdphoto/s58x28_jfs/t9451/359/415622649/15318/b0943e5d/59a78495N3bd2a9f8.png"
        alt=""
      />
    </template>
  </nut-card>
</template>

<style lang="scss">
.tag {
  display: inline-block;
  vertical-align: middle;
  margin-right: 5px;
  margin-left: 2px;
  height: 14px;
}
</style>
```

### 自定义右下角内容

```vue
<script lang="ts" setup>
import { reactive } from 'vue'

const state = reactive({
  imgUrl: '//img10.360buyimg.com/n2/s240x240_jfs/t1/210890/22/4728/163829/6163a590Eb7c6f4b5/6390526d49791cb9.jpg!q70.jpg',
  title: '活蟹】湖塘煙雨 阳澄湖大闸蟹公4.5两 母3.5两 4对8只 鲜活生鲜螃蟹现货水产礼盒海鲜水',
  price: '388',
  vipPrice: '378',
  shopDesc: '自营',
  delivery: '厂商配送',
  shopName: '阳澄湖大闸蟹自营店>'
})
</script>

<template>
  <nut-card
    :img-url="state.imgUrl"
    :title="state.title"
    :price="state.price"
    :vipPrice="state.vipPrice"
    :shopDesc="state.shopDesc"
    :delivery="state.delivery"
    :shopName="state.shopName"
  >
    <template #footer>
      <div class="customize">自定义右下角内容</div>
    </template>
  </nut-card>
</template>

<style lang="scss">
.customize {
  font-size: 12px;
}
</style>
```

## API

### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| img-url | 左侧图片 `Url` | string | - | `''` |
| title | 标题 | string | - | `''` |
| price | 商品价格 | string | - | `''` |
| vip-price | 会员价格 | string | - | `''` |
| shop-desc | 店铺介绍 | string | - | `''` |
| delivery | 配送方式 | string | - | `''` |
| shop-name | 店铺名称 | string | - | `''` |
| is-need-price | 是否需要价格展示 | boolean | - | `true` |

### Events

| 事件名 | 说明 | 类型 |
|------|------|------|
| click | 点击事件 | `(event: MouseEvent) => void` |

### Slots

| 名称 | 说明 |
|------|------|
| prolist | 自定义商品介绍 |
| price | 价格自定义内容 |
| origin | 价格后方自定义内容 |
| shopTag | 店铺介绍自定义 |
| shopName `1.6.4` | 店铺名称自定义 |
| footer | 右下角内容自定义 |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/components/basic/configprovider)。

| 名称 | 默认值 |
|------|------|
| --nut-card-font-size-0 | var(--nut-font-size-0) |
| --nut-card-font-size-1 | var(--nut-font-size-1) |
| --nut-card-font-size-2 | var(--nut-font-size-2) |
| --nut-card-font-size-3 | var(--nut-font-size-3) |
| --nut-card-left-border-radius | 0 |
| --nut-card-left-background-color | inherit |
