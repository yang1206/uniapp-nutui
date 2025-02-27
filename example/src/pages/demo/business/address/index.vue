<script setup lang="ts">
import type { AddressExistRegionData, AddressRegionData, AddressType } from 'nutui-uniapp'
import { reactive, ref } from 'vue'

/* eslint-disable no-console */
interface CalBack {
  next?: string
  value?: AddressRegionData
  custom: string
}
interface CalResult {
  type: string
  data: AddressResult
}
interface AddressList {
  id?: string | number
  provinceName: string
  cityName: string
  countyName: string
  townName: string
  addressDetail: string
  selectedAddress: boolean
}
interface AddressResult extends AddressList {
  addressIdStr: string
  addressStr: string
  province: any
  city: any
  country: any
  town: any
}
const address = reactive<any>({
  province: [
    { id: 1, name: '北京', title: 'B' },
    { id: 2, name: '广西', title: 'G' },
    { id: 3, name: '江西', title: 'J' },
    { id: 4, name: '四川', title: 'S' },
    { id: 5, name: '浙江', title: 'Z' },
  ],
  city: [
    { id: 7, name: '朝阳区', title: 'C' },
    { id: 8, name: '崇文区', title: 'C' },
    { id: 9, name: '昌平区', title: 'C' },

    { id: 6, name: '石景山区', title: 'S' },
    { id: 3, name: '八里庄街道', title: 'B' },
    { id: 10, name: '北苑', title: 'B' },
  ],
  country: [
    { id: 3, name: '八里庄街道', title: 'B' },
    { id: 9, name: '北苑', title: 'B' },
    { id: 4, name: '常营乡', title: 'C' },
  ],
  town: [],
})

const placeholder = ref(['请选择省', '请选择市', '请选择县'])
const value = ref([1, 7, 3])
const value2 = ref([1, 7, 3])

const showPopup = reactive({
  normal: false,
  normal2: false,
  exist: false,
  customImg: false,
  other: false,
  select: false,
})

const icon = reactive({
  selectedIcon: 'heart-fill',
  defaultIcon: 'heart1',
  closeBtnIcon: 'close',
  backBtnIcon: 'left',
})

const existAddress = ref([
  {
    id: 1,
    addressDetail: '',
    cityName: '次渠镇',
    countyName: '通州区',
    provinceName: '北京市',
    selectedAddress: true,
    townName: '',
    name: '探探鱼',
    phone: '182****1718',
  },
  {
    id: 2,
    addressDetail: '',
    cityName: '钓鱼岛全区',
    countyName: '',
    provinceName: '钓鱼岛',
    selectedAddress: false,
    townName: '',
    name: '探探鱼',
    phone: '182****1718',
  },
  {
    id: 3,
    addressDetail: '京东大厦',
    cityName: '大兴区',
    countyName: '科创十一街18号院',
    provinceName: '北京市',
    selectedAddress: false,
    townName: '',
    name: '探探鱼',
    phone: '182****1718',
  },
])

const text = reactive({
  one: '请选择地址',
  two: '请选择地址',
  three: '请选择地址',
  four: '请选择地址',
  five: '请选择地址',
  six: '请选择地址',
})

function showAddress() {
  showPopup.normal = !showPopup.normal
}

function showAddress2() {
  showPopup.normal2 = !showPopup.normal2
}

function showSelected() {
  showPopup.select = !showPopup.select
}

function onChange(cal: CalBack, tag: string) {
  const name = (address)[cal.next!]
  if (name?.length < 1)
    (showPopup as any)[tag] = false
}
function close1(val: CalResult) {
  console.log(val)
  showAddress()
  text.one = val.data.addressStr
}

function close5(val: CalResult) {
  text.five = val.data.addressStr
  value2.value = [val.data.province.id, val.data.city.id, val.data.country.id]
}

function close6(val: CalResult) {
  text.six = val.data.addressStr
  value.value = [val.data.province.id, val.data.city.id, val.data.country.id]
}

function showAddressExist() {
  showPopup.exist = true
}

function close2(val: CalResult) {
  console.log(val)
  if (val.type === 'exist') {
    const { provinceName, cityName, countyName, townName, addressDetail } = val.data
    text.two = provinceName + cityName + countyName + townName + addressDetail
  }
  else {
    text.two = val.data.addressStr
  }
}
function selected(prevExistAdd: AddressExistRegionData, nowExistAdd: AddressExistRegionData, _arr: AddressExistRegionData[]) {
  console.log(prevExistAdd)
  console.log(nowExistAdd)
}

function showAddressOther() {
  showPopup.other = true
}
function showCustomImg() {
  showPopup.customImg = true
}

function close3(val: CalResult) {
  console.log(val)
  if (val.type === 'exist') {
    const { provinceName, cityName, countyName, townName, addressDetail } = val.data
    text.three = provinceName + cityName + countyName + townName + addressDetail
  }
  else {
    text.three = val.data.addressStr
  }
}

function close4(val: CalResult) {
  console.log(val)
  if (val.type === 'exist') {
    const { provinceName, cityName, countyName, townName, addressDetail } = val.data
    text.four = provinceName + cityName + countyName + townName + addressDetail
  }
  else {
    text.four = val.data.addressStr
  }
}

function switchModule(val: { type: AddressType }) {
  if (val.type === 'custom')
    console.log('点击了“选择其他地址”按钮')
  else
    console.log('点击了自定义地址左上角的返回按钮')
}

function closeMask(val: {
  closeWay: 'self' | 'mask' | 'cross'
}) {
  console.log('关闭弹层', val)
}
</script>

<template>
  <div class="demo h-100vh!">
    <h2 class="title">
      选择自定义地址
    </h2>
    <nut-cell
      title="选择地址"
      :desc="text.one"
      is-link
      @click="showAddress"
    />

    <nut-address
      v-model:visible="showPopup.normal"
      :province="address.province"
      :city="address.city"
      :country="address.country"
      :town="address.town"
      @change="(cal) => onChange(cal, 'normal')"
      @close="close1"
    />

    <h2 class="title">
      选中省市区
    </h2>
    <nut-cell
      title="选择地址"
      :desc="text.six"
      is-link
      @click="showSelected"
    />

    <nut-address
      v-model="value"
      v-model:visible="showPopup.select"
      :province="address.province"
      :city="address.city"
      :country="address.country"
      :town="address.town"
      :columns-placeholder="placeholder"
      @change="(cal: CalBack) => onChange(cal, 'select')"
      @close="close6"
    />

    <h2 class="title">
      选择自定义地址2
    </h2>
    <nut-cell
      title="选择地址"
      :desc="text.five"
      is-link
      @click="showAddress2"
    />

    <nut-address
      v-model="value2"
      v-model:visible="showPopup.normal2"
      type="custom2"
      :province="address.province"
      :city="address.city"
      :country="address.country"
      :town="address.town"
      height="270px"
      :columns-placeholder="placeholder"
      @change="(cal: CalBack) => onChange(cal, 'normal2')"
      @close="close5"
    />

    <h2 class="title">
      选择已有地址
    </h2>
    <nut-cell
      title="选择地址"
      :desc="text.two"
      is-link
      @click="showAddressExist"
    />

    <nut-address
      v-model:visible="showPopup.exist"
      type="exist"
      :exist-address="existAddress"
      :is-show-custom-address="false"
      @change="(cal: CalBack) => onChange(cal, 'exist')"
      @close="close2"
      @selected="selected"
    />

    <h2 class="title">
      自定义图标
    </h2>
    <nut-cell
      title="选择地址"
      :desc="text.three"
      is-link
      @click="showCustomImg"
    />

    <nut-address
      v-model:visible="showPopup.customImg"
      type="exist"
      :exist-address="existAddress"
      :is-show-custom-address="false"
      :default-icon="icon.defaultIcon"
      :selected-icon="icon.selectedIcon"
      :close-btn-icon="icon.closeBtnIcon"
      @close="close3"
      @selected="selected"
    >
      <template #unselectedIcon>
        <nut-icon name="heart1" custom-style="margin-right: 8px" />
      </template>
      <template #icon>
        <nut-icon name="heart-fill" custom-style="margin-right: 8px" custom-color="#f00" />
      </template>
      <template #bottom>
        <div class="nut-address-custom-buttom">
          <div class="btn">
            自定义按钮
          </div>
        </div>
      </template>
    </nut-address>

    <h2 class="title">
      自定义地址与已有地址切换
    </h2>
    <nut-cell
      title="选择地址"
      :desc="text.four"
      is-link
      @click="showAddressOther"
    />

    <nut-address
      v-model:visible="showPopup.other"
      type="exist"
      :exist-address="existAddress"
      :province="address.province"
      :city="address.city"
      :country="address.country"
      :town="address.town"
      :back-btn-icon="icon.backBtnIcon"
      @change="(cal) => onChange(cal, 'other')"
      @close="close4"
      @selected="selected"
      @switch-module="switchModule"
      @close-mask="closeMask"
    />
  </div>
</template>

<style lang="scss">
.demo {
  .nut-cell {
    align-items: center;

    .nut-cell__value {
      margin-right: 8px;
    }
  }

  .nut-address-custom-buttom {
    width: 100%;
    height: 54px;
    padding: 6px 0px 0;
    border-top: 1px solid #f2f2f2;
    .btn {
      width: 90%;
      height: 42px;
      line-height: 42px;
      margin: auto;
      text-align: center;
      background: $button-primary-background-color;
      border-radius: 21px;
      font-size: 15px;
      color: $white;
    }
  }
}
</style>

<route lang="json">
{
  "style": {
    "navigationBarTitleText": "Address"
  }
}
</route>
