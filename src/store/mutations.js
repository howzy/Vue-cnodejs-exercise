import { SETUSERINFO } from './mutation-types'

export default {
  [SETUSERINFO](state, userInfo) {
    state.userInfo = userInfo;
  }
}