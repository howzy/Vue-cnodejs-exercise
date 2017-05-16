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
            发布于:{{topic.create_at | getLastTimeStr}}
          </time>
        </div>
        <div class="right">
          <span class="tag"
                      :class="getTabInfo(topic.tab, topic.good, topic.top, true)"
                      v-text="getTabInfo(topic.tab, topic.good, topic.top, true)"></span>
          <span class="name">{{topic.visit_count}}次浏览</span>
        </div>
      </section>
      <section class="markdown-body topic-content" v-html="topic.content"></section>
    </div>
  </div>
</template>

<script>
  import $ from 'webpack-zepto'
  import nvHead from '../components/header'
  import utils from '../libs/utils'

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
        noData: false
      }
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
      }
    },
    components: {
      nvHead
    }
  }

</script>

<style lang="scss">
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
</style>