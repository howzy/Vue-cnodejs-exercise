<template>
  <div>
    <nv-head page-type="主题" :fix-head="true"></nv-head>
    <div id="page" v-if="topic.title">
      <h2 class="topic-title">{{topic.title}}</h2>
      <section class="author-info">
        <img class="avatar" :src="topic.author.avatar_url" />
        <div class="col">
          <span>{{topic.author.loginname}}</span>
          <time>
            发布于:{{topic.create_at | getLastTimeStr(true)}}
          </time>
        </div>
        <div class="right">
          <span class="tag" :class="getTabInfo(topic.tab, topic.good, topic.top, true)" v-text="getTabInfo(topic.tab, topic.good, topic.top, false)"></span>
          <span class="name">{{topic.visit_count}}次浏览</span>
        </div>
      </section>
      <section class="markdown-body topic-content" v-html="topic.content"></section>
      <h3 class="topic-reply">
        <strong>{{topic.reply_count}}</strong> 回复
      </h3>

      <section class="reply-list">
        <ul>
          <li v-for="item in topic.replies">
            <section class="user">
              <router-link to="">
                <img :src="item.author.avatar_url" class="head">
              </router-link>
              <div class="info">
                <span class="cl">
                  <span class="name" v-text="item.author.loginname"></span>
                <span class="name mt10">
                    发布于:{{item.create_at | getLastTimeStr(true)}}
                  </span>
                </span>
                <span class="cr">
                  <span class="iconfont icon" :class="{'uped':isUps(item.ups)}" @click="upReply(item)">&#xe608;</span> {{item.ups.length}}
                <span class="iconfont icon" @click="addReply(item.id)">&#xe609;</span>
                </span>
              </div>
            </section>
            <div class="reply_content" v-html="item.content"></div>
            <nv-reply :topic.sync="topic"
                                :topic-id="topicId"
                                :reply-id="item.id"
                                :reply-to="item.author.loginname"
                                v-if="userInfo.userId && curReplyId === item.id"></nv-reply>
          </li>
        </ul>
      </section>
      <nv-top></nv-top>
      <nv-reply v-if="userInfo.userId" :topic="topic" :topic-id="topicId"></nv-reply>
    </div>
  </div>
</template>

<script>
  import $ from 'webpack-zepto'
  import nvHead from '../components/header'
  import utils from '../libs/utils'
  import nvTop from '../components/backtotop.vue'
  import nvReply from '../components/reply'
  import { mapGetters } from 'vuex'

  export default {
    filters: {
      getLastTimeStr(time, isFromNow) {
        return utils.getLastTimeStr(time, isFromNow);
      }
    },
    data() {
      return {
        showMenu: false, // 是否展示左侧菜单栏
        topic: {}, // 主题
        topicId: '',
        noData: false,
        curReplyId: ''
      }
    },
    computed: {
      ...mapGetters({
        userInfo: 'getUserInfo'
      })
    },
    mounted() {
      // 从路由中获取主题id
      this.topicId = this.$route.params.id;
      // 根据主题id加载相应的主题数据
      $.get('https://cnodejs.org/api/v1/topic/' + this.topicId, res => {
        if (res && res.data) {
          this.topic = res.data;
        } else {
          this.noData = true;
        }
      })
    },
    methods: {
      getTabInfo(tab, good = false, top, isClass) {
        return utils.getTabInfo(tab, good = false, top, isClass);
      },
      isUps(ups) {
        return $.inArray(this.userInfo.userId, ups) >= 0;
      },
      addReply(id) {
        this.curReplyId = id;
        if (!this.userInfo.userId) {
          this.$router.push({
            name: 'login',
            params: {
              redirect: encodeURIComponent(this.$route.path)
            }
          });
        }
      },
      upReply(item) {
        if (!this.userInfo.userId) {
          this.$route.push({
            name: 'login',
            params: {
              redirect: encodeURIComponent(this.$route.path)
            }
          });
        } else {
          $.ajax({
            type: 'POST',
            url: 'https://cnodejs.org/api/v1/reply/' + item.id + '/ups',
            data: {
              accesstoken: this.userInfo.token
            },
            dataType: 'json',
            success: res => {
              if (res.success) {
                if (res.action === 'down') {
                  let index = $.inArray(this.userInfo.userId, item.ups);
                  item.ups.splice(index, 1);
                } else {
                  item.ups.push(this.userInfo.userId);
                }
              }
            },
            error: res => {
              let error = JSON.parse(res.responseText);
              this.$alert(error.error_msg);
              return false;
            }
          });
        }
      }
    },
    components: {
      nvHead,
      nvTop,
      nvReply
    }
  }

</script>

<style lang="scss">
  @import '../assets/scss/detail.scss';
  #page {
    padding-top: 44px;
    background-color: #fff;
    transition: all .3s ease;
    overflow-x: hidden;
  }

  .topic-title {
    margin: 15px;
    padding: 5px;
    font-size: 18px;
    color: #2c3e50;
    line-height: 1.5;
    background-color: #f0f0f0;
    border-radius: 5px;
  }

  .author-info {
    display: flex;
    align-items: center;
    padding: 0 15px;
    color: #34495e;
    font-size: 12px;
    .col {
      display: block;
      width: 100%;
      flex: 1;
    }
    .avatar {
      display: block;
      width: 40px;
      height: 40px;
      margin-right: 15px;
      border-radius: 50%;
    }
    .right {
      text-align: right;
    }
    span,
    time {
      display: block;
      padding: 5px 0;
    }
    .tag {
      padding: 5px 6px;
      font-size: 10px;
      font-weight: 400;
      border-radius: 4px;
      background-color: #e7e7e7;
      text-align: center;
      vertical-align: middle;
      color: #ffffff;
      &.top {
        background: #E74C3C;
      }
      &.ask {
        background: #3498DB;
      }
      &.good {
        background: #E67E22;
      }
      &.job {
        background: #9B59B6;
      }
      &.share {
        background: #1ABC9C;
      }
    }
  }

  .topic-content {
    padding: 15px;
    margin-top: 15px;
    background: #fff;
    border-bottom: 1px solid #d4d4d4;
  }
</style>