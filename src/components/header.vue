<template>
  <div>
    <div class="page-cover" v-if="show" @click="closeMenu"></div>
    <header :class="{'fix-header':fixHead,'show':show&&fixHead,'no-fix':!fixHead}" id="hd">
      <div class="nv-toolbar">
        <div class="toolbar-nav" @click="openMenu" v-if="fixHead"></div>
        <span>{{pageType}}</span>
        <i class="num" v-if="messageCount > 0">{{messageCount}}</i>
        <router-link to="/add">
          <i class="iconfont add-icon" v-if="needAdd" v-show="!messageCount || messageCount < 0">&#xe60f;</i>
        </router-link>
      </div>
    </header>
    <nv-menu :show-menu="show" v-if="fixHead"></nv-menu>
  </div>
</template>

<script>
import $ from 'webpack-zepto'
import nvMenu from './menu'

export default {
  props: {
    pageType: String,
    fixHead: Boolean,
    messageCount: Number,
    needAdd: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      nickname: '',
      profileimagurl: '',
      show: false
    }
  },
  methods: {
    openMenu() {
      $('html, body, #page').addClass('scroll-hide');
      this.show = !this.show;
    },
    closeMenu() {
      this.show = !this.show;
      $('html, body, #page').removeClass('scroll-hide');
    }
  },
  components: {
    nvMenu
  }
}
  
</script>

<style lang="scss">
  .page-cover {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, .4);
    z-index: 7;
  }
  #hd {
    border-bottom: 1px solid #e8e8e8;

    &.fix-header {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 6;
      width: 100%;
      background-color: rgba(255, 255, 255, 0.95);
      box-shadow: 0 0 4px rgba(0, 0, 0, 0.25);
      transition: all .3s ease;
    }

    &.no-fix {
      width: 100%;
      background-color: #fff;
      overflow: hidden;
    }

    &.show {
      transform: translateX(200px);
    }
  }
  .nv-toolbar {
    width: 100%;
    height: 44px;
    display: flex;
    align-items: center;

    .toolbar-nav {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      width: 49px;
      height: 44px;
      background: url('../assets/images/components/nav_icon.png') no-repeat center center;
      background-size: 19px 16px;
    }

    &>span {
      display: block;
      width: 100%;
      height: 100%;
      line-height: 44px;
      font-size: 16px;
      text-align: center;
    }

    .num {
      position: absolute;
      right: 10px;
      top: 10px;
      z-index: 10;
      width: 20px;
      height: 20px;
      line-height: 20px;
      text-align: center;
      color: #fff;
      border-radius: 50%;
    }

    .add-icon {
      position: absolute;
      right: 10px;
      top: 10px;
      z-index: 10;
      padding: 5px 15px;
      color: #42b983;
      border-radius: 5px;
    }
  }
  .scroll-hide {
    height: 100%;
    overflow: hidden;
  }
</style>