import { SETUSERINFO } from './mutation-types'

export default {
  setUserInfo({ commit }, user) {
    commit(SETUSERINFO, user);
  }
}