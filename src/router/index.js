import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const home = r => require.ensure([], () => r(require('../pages/home')), 'home')
const list = r => require.ensure([], () => r(require('../pages/list')), 'list')
const login = r => require.ensure([], () => r(require('../pages/login')), 'login')
const add = r => require.ensure([], () => r(require('../pages/new')), 'add')

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/list',
      name: 'list',
      component: list
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/add',
      name: 'add',
      component: add,
      meta: { requiresAuth: true }
    }
  ]
})
