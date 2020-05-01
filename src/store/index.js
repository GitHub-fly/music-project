import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    token: localStorage.getItem('token'),
    admin: JSON.parse(localStorage.getItem('admin')),
    menuList: [],
    roleName: ''
  },
  mutations: {
    setToken(state, data) {
      state.token = data
    },
    setAdmin(state, data) {
      state.admin = data
    },
    setMenuList(state, menuList) {
      state.menuList = menuList
    },
    setRoleName(state, roleName) {
      state.roleName = roleName
    }
  },
  actions: {}
})
export default store
