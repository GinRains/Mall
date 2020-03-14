import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutation-types'

export default {
  // 1. mutations唯一的目的就是修改state的状态
  // 2. mutations中的每一个方法尽可能完成的事情比较单一点
  [ADD_COUNTER](state, payload) {
    payload.count++
  },
  [ADD_TO_CART](state, payload) {
    payload.count = 1
    payload.checked = false
    state.cartList.push(payload)
  }
}
