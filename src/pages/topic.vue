<template>
  <div>
    <nv-head page-type="主题" :fix-head="true"></nv-head>
    <div id="page">
      <h2 class="topic-title">{{topic.title}}</h2>
      section
    </div>
  </div>
</template>

<script>
import $ from 'webpack-zepto'
import nvHead from '../components/header';

export default {
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
  components: {
    nvHead
  }
}
</script>

<style lang="scss">
#page {
  padding-top: 44px;
  background-color:#fff;
  transition: all .3s ease;
  overflow-x:hidden;
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