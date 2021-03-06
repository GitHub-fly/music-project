import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import MuseUI from 'muse-ui'

//引入axios
import axios from 'axios'
import 'muse-ui/dist/muse-ui.css'

axios.defaults.baseURL = 'http://localhost:8080/api'

Vue.prototype.axios = axios

Vue.use(MuseUI)

Vue.config.productionTip = false

// 导航钩子，全局钩子
// router.beforeEach((to, from, next) => {
//   let token = localStorage.getItem('token')
//   let isLogin
//   if (!token) {
//     isLogin = false
//   } else {
//     isLogin = true
//   }
//   if (!isLogin) {
//     if (to.path !== '/login') {
//       return next({ path: '/login' })
//     } else {
//       next()
//     }
//   } else {
//     if (to.path === '/login') {
//       return next({ path: '/' })
//     }
//     next()
//   }
// })

//全局请求拦截
axios.interceptors.request.use((config) => {
  //请求的接口不是登录和验证码接口
  if (['/sysAdmin/login', '/captcha'].indexOf(config.url) === -1) {
    const token = localStorage.getItem('token')
    const id = localStorage.getItem('id')
    if (token) {
      config.headers.Authorization = token
      config.headers.id = id
    }
  }
  return config
})

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App)
}).$mount('#app')
