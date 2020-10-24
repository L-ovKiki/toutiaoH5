import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 一个对象，存储当前登录用户信息（toke等数据）
  },
  mutations: {
    setUser (state, data) {
      state.user = data
    }
  },
  actions: {
  },
  modules: {
  }
})
