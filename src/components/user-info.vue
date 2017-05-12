<template>
  <div class="user-info">
    <!--未登录-->
    <ul class="login-no" v-if="!userInfo.loginname">
      <li class="login" @click="goEnter"><a>登录</a></li>
    </ul>
    <!--已登录-->
    <div class="login-yes" v-if="userInfo.loginname" @click="goUser">
      <div class="avatar"><img v-if="userInfo.avatar_url" :src="userInfo.avatar_url"></div>
      <div class="info">
        <p v-if="userInfo.loginname" v-text="userInfo.loginname"></p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      userInfo: 'getUserInfo'
    })
  },
  methods: {
    goEnter() {
      this.$router.push({
        name: 'login',
        query: {
          redirect: encodeURIComponent(this.$route.path)
        }
      });
    },
    goUser() {
      this.$router.push({
        name: 'user',
        params: {
          loginname: this.userInfo.loginname
        }
      })
    }
  }
}
</script>

<style lang="scss">
  .user-info {
    padding: 15px;
    color: #313131;
    font-size: 15px;
  }

  .login-no {
    margin: 8px 9px;

    &>li {
      position: relative;
      padding-left: 34px;
      height: 24px;
      line-height: 24px;
    }

    .login:before {
      position: absolute;
      top: 0;
      left: 0;
      width: 24px;
      height: 24px;
      content: '';
      background: url("../assets/images/components/login_icon.png") no-repeat left center;
      background-size: 24px 24px;
    }
  }

  .login-yes {
    height: 100%;
    background: url("../assets/images/components/go_next_icon.png") no-repeat right center;
    background-size: 6px 10px;
    overflow: hidden;
    position: relative;
    .avatar {
      width: 40px;
      height: 40px;
      background: url("../assets/images/components/user.png") no-repeat center center;
      background-size: 40px 40px;
      border-radius: 20px;
      overflow: hidden;
      float: left;
      &>img {
        width: 40px;
        height: 40px;
        display: block;
      }
    }
    .info {
      margin-left: 10px;
      overflow: hidden;
      float: left;
    }
    p {
      width: 85px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-size: 12px;
      line-height: 12px;
      line-height: 40px;
      &.lh20 {
        line-height: 20px;
      }
    }
    &:after {
      display: block;
      background: url("../assets/images/components/go_icon.png") no-repeat center right;
      background-size: 7px 7px;
    }
  }
</style>