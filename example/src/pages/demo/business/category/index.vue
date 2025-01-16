<script setup lang="ts">
import { onMounted, reactive } from 'vue'
// @ts-expect-error TS7016
import { categoryChild, categoryInfo, customCategory } from './data'

const data = reactive({
  category: [{}],
  categoryChild1: [{}],
  customCategory: [{}],
  categoryChild2: [{}],
})

onMounted(() => {
  setTimeout(() => {
    data.category = categoryInfo.category
    data.categoryChild1 = categoryChild
    data.customCategory = customCategory
    data.categoryChild2 = categoryChild
  }, 500)
})

function change(index: any) {
  data.categoryChild1 = [].concat((data.category as any)[index].children)
}

function changeText(index: any) {
  data.categoryChild2 = [].concat((data.category as any)[index].children)
}

function changeCustom() {
/* eslint-disable no-console */
  console.log('点击分类数据')
}

function onChange() {
  console.log('当前分类数据')
}
</script>

<template>
  <div class="demo full category-demo">
    <h2 class="title">
      经典分类模式
    </h2>
    <nut-category :category="data.category" @change="change">
      <nut-category-pane :category-child="data.categoryChild1" @on-change="onChange" />
    </nut-category>

    <h2 class="title">
      只显示文字
    </h2>
    <nut-category :category="data.category" @change="changeText">
      <nut-category-pane type="text" :category-child="data.categoryChild2" @on-change="onChange" />
    </nut-category>

    <h2 class="title">
      自定义分类
    </h2>
    <nut-category>
      <nut-category-pane type="custom" :custom-category="customCategory" @on-change="changeCustom" />
    </nut-category>
  </div>
</template>

<style lang="scss" scoped>
.category-demo {
  padding-left: 0 !important;
  padding-right: 0px !important;
}
</style>

<route lang="json">
{
  "style": {
    "navigationBarTitleText": "Category"
  }
}
</route>
