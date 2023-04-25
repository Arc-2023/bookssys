/*
 * @Description: 项目启动
 * @Author: zy
 * @Date: 2020-10-22 21:41:40
 * @LastEditors: Wuyi
 * @LastEditTime: 2021-05-30 14:29:43
 */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './assets/fonts/iconfont.css'
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:8080/'
Vue.prototype.$http = axios

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
