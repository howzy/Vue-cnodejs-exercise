<template>
  <div>
    <nv-head ref="head" :page-type="getTitleStr(searchKey.tab)" :fix-head="true"></nv-head>
    <h1>List</h1>
  </div>
</template>

<script>
import $ from 'webpack-zepto'
import nvHead from '../components/header'

export default {
  data() {
    return {
      topics: [],
      searchKey: {
        page: 1,
        tab: 'all',
        limit: 20,
        mdrender: true
      }
    }
  },
  mounted() {
    if (this.$route.query && this.$route.query.tab) {
      this.searchKey.tab = this.$route.query.tab
    }

    // 如果从详情返回并且之前存有对应的查询条件和参数
    // 则直接渲染之前的数据
    if (sessionStorage.searchKey && sessionStorage.searchKey.tab === this.searchKey.tab) {
      this.topics = JSON.parse(sessionStorage.topics);
      this.searchKey = JSON.parse(sessionStorage.searchKey);
      this.$nextTick(() => $(window).scrollTop(sessionStorage.scrollTop));
    } else {
      this.getTopics();
    }

    // 滚动加载
  },
  beforeRouteLeave(to, from , next) {
    // 如果跳转到详情页面，则记录关键数据
    // 方便从详情页面返回到该页面的时候继续加载之前位置的数据
    if (to.name = 'topic') {
      // 当前滚动条的位置
      sessionStorage.scrollTop = $(window).scrollTop();
      // 当前页面的主题数据
      sessionStorage.topics = JSON.stringify(this.topics);
      // 查询参数
      sessionStorage.searchKey = JSON.stringify(this.searchKey);
      // 当前tab
      sessionStorage.tab = from.query.tab || 'all';
    }
    next();
  },
  beforeRouteEnter(to, from, next) {
    if (from.name !== 'topic') {
      // 页面切换移除之前记录的数据集
      if (sessionStorage.tab) {
        sessionStorage.removeItem('topics');
        sessionStorage.removeItem('searchKey');
        sessionStorage.removeItem('tab');
      }
    }
    next();
  },
  methods: {
    getTopics() {
      let params = $.param(this.searchKey);
      $.get('https://cnodejs.org/api/v1/topics?' + params, res => {
        if (res && res.data) {
          res.data.forEach(this.mergeTopics);
        }
      })
    },
    mergeTopics(topic) {
      this.topics.push(topic);
    },
    getTitleStr(tab) {
      switch(tab) {
        case 'share':
          return '分享';
        case 'ask':
          return '问答';
        case 'job':
          return '招聘';
        case 'good':
          return '精华';
        default:
          return '全部';
      }
    }
  },
  watch: {
    // 切换页面
    '$route' (to, from) {
      // 如果是当前页面切换分类的情况
      if (to.query && to.query.tab) {
        this.topics = [];
      }
      this.searchKey.page = 1;
      this.getTopics();
      this.$refs.head.show = false;
    }
  },
  components: {
    nvHead
  }
}
</script>

<style lang="scss">

</style>