// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Alert from './libs/alert'
import store from './store/'
import $ from 'webpack-zepto'

Vue.use(Alert)

Vue.config.productionTip = false

if (sessionStorage.user) {
  store.dispatch('setUserInfo', JSON.stringify(sessionStorage.user));
}

// 登录验证，页面需要登录而没有登录的情况下直接跳转到登录页面
router.beforeEach((to, from, next) => {
  // 恢复页面的滚动效果
  $('html, body, #page').removeClass('scroll-hide');
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.state.userInfo.userId) {
      next();
    } else {
      next({
        name: 'login',
        query: { redirect: to.fullPath }
      });
    }
  } else {
    next();
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
