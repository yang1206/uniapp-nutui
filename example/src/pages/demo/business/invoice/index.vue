<script setup lang="ts">
import { reactive, ref } from 'vue'

/* eslint-disable no-console */

const formValue = reactive({
  type: '企业',
  name: '',
  num: '',
  adress: '',
  tel: '',
  address: '',
  bank: '',
  account: '',
})

// Promise 异步校验
function asyncValidator(val: string) {
  return new Promise((resolve) => {
    console.log('模拟异步验证中...')
    setTimeout(() => {
      resolve(/^400(-?)\d{7}$|^1\d{10}$|^0\d{2,3}-\d{7,8}$/.test(val))
    }, 1000)
  })
}

const data: any = ref([
  {
    type: 'radio',
    label: '类型',
    radioLabel: [
      {
        label: '测试企业',
      },
      {
        label: '测试个人或事业单位',
      },
    ],
    formItemProp: 'type',
    required: true,
  },
  {
    label: '抬头',
    placeholder: '请输入抬头',
    formItemProp: 'name',
    required: true,
  },
  {
    label: '识别号',
    placeholder: '请输入识别号',
    formItemProp: 'num',
    rules: [{ message: '请输入识别号' }],
  },
  {
    label: '注册地址',
    placeholder: '请输入注册地址',
    formItemProp: 'adress',
    rules: [{ required: true, message: '请输入地址' }],
    required: true,
  },
  {
    label: '号码',
    placeholder: '请输入号码',
    formItemProp: 'tel',
    rules: [
      { required: true, message: '请输入号码' },
      { validator: asyncValidator, message: '号码格式不正确' },
    ],
    required: true,
  },
  {
    label: '行',
    placeholder: '请输入行',
    formItemProp: 'bank',
  },
  {
    label: '账户',
    placeholder: '请输入账户',
    formItemProp: 'account',
  },
])

function submit(valid: boolean | object, errors: any[]) {
  if (valid)
    console.log('success', formValue)
  else
    console.log('error submit!!', errors)
}
</script>

<template>
  <div class="demo full h-100vh!">
    <h2 class="title">
      默认用法  (仅为组件示例，不会收集任何信息)
    </h2>
    <nut-invoice :data="data" :form-value="formValue" @on-submit="submit" />
  </div>
</template>

<style lang="scss" scoped>
.nut-button {
  margin-right: 10px;
}
</style>

<route lang="json">
{
  "style": {
    "navigationBarTitleText": "Invoice"
  }
}
</route>
