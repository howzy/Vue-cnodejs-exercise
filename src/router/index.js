import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const home = r => require.ensure([], () => r(require('../pages/home')), 'home')
const list = r => require.ensure([], () => r(require('../pages/list')), 'list')

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
    }
  ]
})
