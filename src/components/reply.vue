<template>
  <section class="reply">
    <textarea id="content" rows="8" class="text" placeholder="回复支持Markdown语法,请注意标记代码"></textarea>
    <a class="button">确定</a>
  </section>
</template>

<script>

</script>

<style lang="scss">
  .reply textarea {
    display: block;
    width: 100%;
    flex: 1;
    border: 1px solid #d5dbdb;
    background-color: #fff;
    font-size: 14px;
    padding: 15px;
    color: #313131;
  }
  .reply .button {
    display: inline-block;
    width: 100%;
    height: 42px;
    margin: 15px 0;
    line-height: 42px;
    color: #fff;
    font-size: 16px;
    background-color: #4fc08d;
    border: none;
    border-bottom: 2px solid #3aa373;
    text-align: center;
    vertical-align: middle;
  }
</style>