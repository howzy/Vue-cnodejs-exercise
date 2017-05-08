<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
@import './assets/scss/common/reset.scss';

#app {
  height: 100%;
}
</style>
