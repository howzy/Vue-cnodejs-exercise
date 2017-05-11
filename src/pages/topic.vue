<template>
  <div>
    <nv-head page-type="主题" :fix-head="true"></nv-head>
    <h1>topic</h1>
  </div>
</template>

<script>
import nvHead from '../components/header';

export default {
  data() {
    return {
      showMenu: false, // 是否展示左侧菜单栏
      topic: {}, // 主题
      topicId: ''
    }
  },
  mounted() {

  },
  components: {
    nvHead
  }
}
</script>