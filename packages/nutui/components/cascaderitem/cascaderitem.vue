<script setup lang="ts">
import type { Ref } from 'vue'
import { computed, defineComponent, ref, watch } from 'vue'
import { CHANGE_EVENT, PREFIX, UPDATE_MODEL_EVENT } from '../_constants'
import { getMainClass } from '../_utils'
import { useTranslate } from '../../locale'
import { convertListToOptions } from '../cascader/helper'
import Tree from '../cascader/tree'
import type { CascaderOption, CascaderPane, CascaderTabs, CascaderValue, convertConfig } from '../cascader/types'
import NutIcon from '../icon/icon.vue'
import NutTabPane from '../tabpane/tabpane.vue'
import NutTabs from '../tabs/tabs.vue'
import { cascaderitemEmits, cascaderitemProps } from './cascaderitem'

const props = defineProps(cascaderitemProps)
const emit = defineEmits(cascaderitemEmits)
const componentName = `${PREFIX}-calendar-item`
const { translate } = useTranslate(componentName)
const classes = computed(() => {
  return getMainClass(props, componentName, {
    'nut-cascader': true,
  })
})
const configs = computed(() => ({
  lazy: props.lazy,
  lazyLoad: props.lazyLoad,
  valueKey: props.valueKey,
  textKey: props.textKey,
  childrenKey: props.childrenKey,
  convertConfig: props.convertConfig,
}))

const tabsCursor = ref(0)
const initLoading = ref(false)
const innerValue: Ref<CascaderValue> = ref(props.modelValue as CascaderValue)
const tree: Ref<Tree> = ref(new Tree([], {}))
const panes: Ref<CascaderPane[]> = ref([])
const isLazy = computed(() => configs.value.lazy && Boolean(configs.value.lazyLoad))

const lazyLoadMap = new Map()
let currentProcessNode: CascaderOption | null
async function init() {
  lazyLoadMap.clear()
  panes.value = []
  tabsCursor.value = 0
  initLoading.value = false
  currentProcessNode = null

  let { options } = props

  if (configs.value.convertConfig)
    options = convertListToOptions(options as CascaderOption[], configs.value.convertConfig as convertConfig)

  tree.value = new Tree(options as CascaderOption[], {
    value: configs.value.valueKey,
    text: configs.value.textKey,
    children: configs.value.childrenKey,
  })

  if (isLazy.value && !tree.value.nodes.length) {
    await invokeLazyLoad({
      root: true,
      loading: true,
      text: '',
      value: '',
    })
  }

  panes.value = [{ nodes: tree.value.nodes, selectedNode: null }]
  syncValue()
}

async function syncValue() {
  const currentValue = innerValue.value

  if (currentValue === undefined || !tree.value.nodes.length)
    return

  if (currentValue.length === 0) {
    tabsCursor.value = 0
    panes.value = [{ nodes: tree.value.nodes, selectedNode: null }]
    return
  }

  let needToSync = currentValue

  if (isLazy.value && Array.isArray(currentValue) && currentValue.length) {
    needToSync = []
    const parent = tree.value.nodes.find(node => node.value === currentValue[0])

    if (parent) {
      needToSync = [parent.value]
      initLoading.value = true

      const last = await currentValue.slice(1).reduce(async (p: Promise<CascaderOption | void>, value) => {
        const parent = await p

        await invokeLazyLoad(parent)
        const node = parent?.children?.find(item => item.value === value)

        if (node)
          needToSync.push(value)

        return Promise.resolve(node)
      }, Promise.resolve(parent))

      await invokeLazyLoad(last)

      initLoading.value = false
    }
  }

  if (needToSync.length && currentValue === props.modelValue) {
    const pathNodes = tree.value.getPathNodesByValue(needToSync)
    pathNodes.forEach((node, index) => {
      tabsCursor.value = index
      methods.handleNode(node, true)
    })
  }
}

async function invokeLazyLoad(node?: CascaderOption | void) {
  if (!node)
    return

  if (!configs.value.lazyLoad) {
    node.leaf = true
    return
  }

  if (tree.value.isLeaf(node, isLazy.value) || tree.value.hasChildren(node, isLazy.value))
    return

  node.loading = true

  const parent = node.root ? null : node
  let lazyLoadPromise = lazyLoadMap.get(node)

  if (!lazyLoadPromise) {
    lazyLoadPromise = new Promise((resolve) => {
      // 外部必须resolve
      configs.value.lazyLoad?.(node, resolve)
    })
    lazyLoadMap.set(node, lazyLoadPromise)
  }

  const nodes: CascaderOption[] | void = await lazyLoadPromise

  if (Array.isArray(nodes) && nodes.length > 0) {
    tree.value.updateChildren(nodes, parent)
  }
  else {
    // 如果加载完成后没有提供子节点，作为叶子节点处理
    node.leaf = true
  }

  node.loading = false
  lazyLoadMap.delete(node)
}

function emitChange(pathNodes: CascaderOption[]) {
  const emitValue = pathNodes.map(node => node.value)

  innerValue.value = emitValue
  emit(CHANGE_EVENT, emitValue, pathNodes)
  emit(UPDATE_MODEL_EVENT, emitValue, pathNodes)
}

function formatTabTitle(pane: CascaderPane) {
  return pane.selectedNode ? pane.selectedNode.text : translate('select')
}

const methods = {
  // 选中一个节点，静默模式不触发事件
  async handleNode(node: CascaderOption, silent?: boolean) {
    if (node.level !== void 0 && (node.level !== Number(tabsCursor.value))) {
      return
    }

    const { disabled, loading } = node

    if ((!silent && disabled) || !panes.value[tabsCursor.value])
      return

    if (tree.value.isLeaf(node, isLazy.value)) {
      node.leaf = true
      panes.value[tabsCursor.value].selectedNode = node
      panes.value = panes.value.slice(0, (node.level as number) + 1)

      if (!silent) {
        const pathNodes = panes.value.map(pane => pane.selectedNode)

        emitChange(pathNodes as CascaderOption[])
        emit('pathChange', pathNodes as CascaderOption[])
      }
      return
    }

    if (tree.value.hasChildren(node, isLazy.value)) {
      const level = (node.level as number) + 1

      panes.value[tabsCursor.value].selectedNode = node
      panes.value = panes.value.slice(0, level)
      panes.value.push({
        nodes: node.children || [],
        selectedNode: null,
      })

      tabsCursor.value = level

      if (!silent) {
        const pathNodes = panes.value.map(pane => pane.selectedNode)
        emit('pathChange', pathNodes as CascaderOption[])
      }
      return
    }

    currentProcessNode = node

    if (loading)
      return

    await invokeLazyLoad(node)

    if (currentProcessNode === node) {
      panes.value[tabsCursor.value].selectedNode = node
      methods.handleNode(node, silent)
    }
  },
  handleTabClick(tab: CascaderTabs) {
    currentProcessNode = null
    tabsCursor.value = Number(tab.paneKey)
  },

  isSelected(pane: CascaderPane, node: CascaderOption) {
    return pane?.selectedNode?.value === node.value
  },
}

watch(
  [configs, () => props.options],
  () => {
    init()
  },
  {
    deep: true,
    immediate: true,
  },
)
watch(
  () => props.modelValue,
  (value) => {
    if (value !== innerValue.value) {
      innerValue.value = value as CascaderValue
      syncValue()
    }
  },
)
watch(
  () => props.visible,
  (val) => {
    // console.log('watch: props.visible', val);
    // TODO: value为空时，保留上次选择记录，修复单元测试问题
    if (val && Array.isArray(innerValue.value) && innerValue.value.length > 0)
      syncValue()
  },
)
</script>

<script lang="ts">
export default defineComponent({
  name: `${PREFIX}-cascader-item`,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})
</script>

<template>
  <NutTabs
    v-model="tabsCursor"
    :custom-class="classes"
    :custom-style="customStyle"
    :type="props.titleType"
    :ellipsis="props.titleEllipsis"
    :title-gutter="props.titleGutter"
    :size="props.titleSize"
    title-scroll
    @click="methods.handleTabClick"
  >
    <template v-if="!initLoading && panes.length">
      <NutTabPane v-for="(pane, index) in panes" :key="index" :title="formatTabTitle(pane)">
        <view role="menu" class="nut-cascader-pane">
          <scroll-view scroll-y style="height: 100%">
            <template v-for="node in pane.nodes" :key="node.value">
              <view
                class="nut-cascader-item"
                :aria-checked="methods.isSelected(pane, node)"
                :aria-disabled="node.disabled || undefined"
                :class="{ active: methods.isSelected(pane, node), disabled: node.disabled }"
                role="menuitemradio"
                @click="methods.handleNode(node, false)"
              >
                <view class="nut-cascader-item__title">
                  {{ node.text }}
                </view>

                <NutIcon
                  v-if="node.loading"
                  loading
                  custom-class="nut-cascader-item__icon-loading"
                  name="loading"
                />
                <NutIcon v-else custom-class="nut-cascader-item__icon-check" name="checklist" />
              </view>
            </template>
          </scroll-view>
        </view>
      </NutTabPane>
    </template>
    <template v-else>
      <NutTabPane title="Loading...">
        <view class="nut-cascader-pane" />
      </NutTabPane>
    </template>
  </NutTabs>
</template>

<style lang="scss">
@import './index';
</style>
