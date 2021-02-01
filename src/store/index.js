import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  // 相当于全局变量
  state: {
    token: 'sadasdas'
  },
  // 控制全局变量的值   写方法的形式 在这里写  一个一个的方法
  mutations: {
  },
  actions: {
  },
  getters: {
  },
  modules: {
  }
})
