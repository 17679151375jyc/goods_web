import Vue from 'vue'
import App from './App.vue'

import '@/style/style.css'
import '@/style/flewStyle.css'
import '@/style/common.css'

import router from './router/router'


import '@/axios/http.js'
import '@/common/data.js'
import '@/common/verification.js'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),  
  router,
}).$mount('#app')
