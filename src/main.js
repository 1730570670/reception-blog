import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';//引入ElementUI组件
import 'element-ui/lib/theme-chalk/index.css';//引入ElementUI样式

Vue.use(ElementUI);//使用ElementUI

import axios from 'axios'//引入axios

Vue.prototype.$axios=axios;//全局注册axios
// 注册封装的axios
import {ajaxGet,ajaxPost} from '@/http/axios'
Vue.prototype.$ajaxGet=ajaxGet;//全局注册ajaxGet
Vue.prototype.$ajaxPost=ajaxPost;//全局注册ajaxPost
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
