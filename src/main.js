import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts

Vue.use(ElementUI)
Vue.use(axios)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
}).$mount('#app')
