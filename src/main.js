import Vue from 'vue'
import App from './App.vue'

import router from './router/index'

Vue.config.productionTip = false

// 在Vue实例上创建总线
Vue.prototype.$bus = new Vue()

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
