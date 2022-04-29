import Vue from 'vue'
import App from './App.vue'
import 'amfe-flexible'
import router from './router/router'
Vue.use(router)
//引入UI vant按需引入
import './vant'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
