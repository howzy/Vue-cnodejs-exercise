<template>
  <section id="sideBar" class="nav-list" :class="{'show': showMenu}">
    <user-info></user-info>
    <section class="list-ul">
      <router-link class="icon-quanbu iconfont item" :to="{'name':'list', query:{tab:'all'}}">全部</router-link>
      <router-link class="icon-hao iconfont item" :to="{'name':'list', query:{tab:'good'}}">精华</router-link>
      <router-link class="icon-fenxiang iconfont item" :to="{'name':'list', query:{tab:'share'}}">分享</router-link>
      <router-link class="icon-wenda iconfont item" :to="{'name':'list', query:{tab:'ask'}}">问答</router-link>
      <router-link class="icon-zhaopin iconfont item" :to="{'name':'list', query:{tab:'job'}}">招聘</router-link>
      <router-link class="icon-xiaoxi iconfont item line" :to="{'name':'list'}">消息</router-link>
      <router-link class="icon-about iconfont item" :to="{'name':'list'}">关于</router-link>
    </section>
  </section>
</template>

<script>

export default {
  props: ['showMenu', 'pageType', 'nickName', 'profileUrl'],
  components: {
    'userInfo': require('./user-info')
  }
}
</script>

<style lang="scss">
  .nav-list {
    position: fixed;
    top: 0;
    bottom: 0;
    left: -200px;
    z-index: 99;
    width: 200px;
    color: #313131;
    background-color: #fff;
    transition: all .3s ease;

    &.show {
      transform: translateX(200px);
    }
  }
  .list-ul {
    margin: 0 24px;
    padding-top: 9%;
    border-top: 1px solid #d4d4d4;

    .item {
      display: block;
      padding: 9% 0;
      color: #313131;
      text-indent: 1px;
      font: 200 14px/15px;
      font-weight: 700;
      font-size: 14px;
      line-height: 15px;

      &:last-child {
        margin-bottom: 50px;
      }

      &:before {
        color: #2c3e50;
      }
    }
    .line {
      border-top: 1px solid #d4d4d4;
    }
  }
</style>