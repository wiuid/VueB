import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  // 相当于全局变量
  state: {
    dialogWidth: '50%'
  },
  // 获取容器中的数据
  getters: {
    getDialogWidth (state) {
      return state.dialogWidth
    }
  },
  // 设置容器中的数据
  mutations: {
    setDialogWidth (state) {
      const clientWidth = document.body.clientWidth
      if (clientWidth < 685) {
        state.dialogWidth = '100%'
      } else {
        state.dialogWidth = '50%'
      }
    }
  },
  // 主要是页面和vuex 的方法之间的api处理
  actions: {
    setDialogWidth ({ commit, state }) {
      commit('setDialogWidth')
    }
  },
  modules: {
  }
})
