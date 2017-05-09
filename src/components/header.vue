<template>
  <div>
    <div class="page-cover"></div>
    <header class="fix-header" id="hd">
      <div class="nv-toolbar">
        <div class="toolbar-nav"></div>
        <span>登录</span>
        <router-link to="/add">
          <i class="iconfont add-icon">&#xe60f;</i>
        </router-link>
      </div>
    </header>
  </div>
</template>

<script>
  
</script>

<style lang="scss">
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