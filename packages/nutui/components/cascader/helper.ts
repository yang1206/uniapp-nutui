import type { CascaderConfig, CascaderOption, convertConfig } from './types'

export function formatTree(tree: CascaderOption[], parent: CascaderOption | null, config: CascaderConfig, maxLevel = 0): { nodes: CascaderOption[], maxLevel: number } {
  const nodes = tree.map((node: CascaderOption) => {
    const { value: valueKey = 'value', text: textKey = 'text', children: childrenKey = 'children' } = config

    const { [valueKey]: value, [textKey]: text, [childrenKey]: children, ...others } = node

    const level = parent ? ((parent && parent.level) || 0) + 1 : 0

    maxLevel = Math.max(maxLevel, level)

    const newNode: CascaderOption = {
      loading: false,
      ...others,
      level,
      value,
      text,
      children,
      _parent: parent,
    }

    if (newNode.children && newNode.children.length) {
      const { nodes, maxLevel: level } = formatTree(newNode.children, newNode, config, maxLevel)
      newNode.children = nodes
      maxLevel = Math.max(maxLevel, level)
    }

    return newNode
  })

  return { nodes, maxLevel }
}

export function eachTree(tree: CascaderOption[], cb: (node: CascaderOption) => any): void {
  let i = 0
  let node: CascaderOption
  /* eslint-disable no-cond-assign */
  while ((node = tree[i++])) {
    if (cb(node) === true)
      break

    if (node.children && node.children.length)
      eachTree(node.children, cb)
  }
}

const defaultConvertConfig = {
  topId: null,
  idKey: 'id',
  pidKey: 'pid',
  sortKey: '',
}
export function convertListToOptions(list: CascaderOption[], options: convertConfig): CascaderOption[] {
  const mergedOptions = {
    ...defaultConvertConfig,
    ...(options || {}),
  }

  const { topId, idKey, pidKey, sortKey } = mergedOptions

  let result: CascaderOption[] = []
  let map: any = {}

  list.forEach((node: CascaderOption) => {
    node = { ...node }
    const { [idKey]: id, [pidKey]: pid } = node
    const children = (map[pid] = map[pid] || [])

    if (!result.length && pid === topId)
      result = children

    children.push(node)

    node.children = map[id] || (map[id] = [])
  })

  if (sortKey) {
    Object.keys(map).forEach((i) => {
      if (map[i].length > 1)
        map[i].sort((a: CascaderOption, b: CascaderOption) => a[sortKey] - b[sortKey])
    })
  }

  map = null

  return result
}
