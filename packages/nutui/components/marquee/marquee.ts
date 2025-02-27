import type { CSSProperties, ExtractPropTypes, PropType } from 'vue'
import { commonProps, makeNumericProp } from '../_utils'

export const marqueeProps = {
  ...commonProps,
  /**
   * @description 抽奖样式
   */
  styleOpt: {
    type: Object as PropType<Record<string, CSSProperties>>,
    default: () => {
      return {
        itemStyle: {},
        startStyle: {},
        bgStyle: {
          background: 'rgb(255, 231, 149)',
        },
      }
    },
  },
  /**
   * @description 奖品列表
   */
  prizeList: {
    type: Array<any>,
    required: true,
  },
  /**
   * @description 是否禁用开始抽奖点击
   */
  disabled: Boolean,
  /**
   * @description 中奖奖品的index
   */
  prizeIndex: makeNumericProp(-1),
  /**
   * @description 初始转动速度
   */
  speed: makeNumericProp(150),
  /**
   * @description 预抽奖，转动多少次进入抽奖环节
   */
  circle: makeNumericProp(30),
}

export type MarqueeProps = ExtractPropTypes<typeof marqueeProps>

export const marqueeEmits = {
  click: () => true,
  /**
   * @description 开始跑动的回调函数，此时将接口中的中奖索引，赋值到 prize-index
   */
  startTurns: () => true,
  /**
   * @description 停止跑动后的回调函数
   */
  endTurns: () => true,

}

export type MarqueeEmits = typeof marqueeEmits
