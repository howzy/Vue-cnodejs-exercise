<template>
  <div class="login-page">
    <section class="page-body">
      <div class="label">
        <input type="text" class="txt" placeholder="Access Token" maxlength="36">
      </div>
      <div class="label">
        <span class="button">登录</span>
      </div>
    </section>
  </div>
</template>

<script>
  
</script>

<style lang="scss">
  .page-body {
    padding: 50px 15px;
    min-height: 400px;
    background-color: #fff;

    .label {
      margin-top: 15px;

      .txt {
        width: 100%;
        padding: 12px 0;
        border: none;
        border-bottom: 1px solid #4fc08d;
        background-color: transparent;
        font-size: 14px;
        color: #313131;
      }
      .button {
        display: inline-block;
        width: 100%;
        height: 42px;
        line-height: 42px;
        border-radius: 3px;
        color: #fff;
        font-size: 16px;
        background-color: #4fc08d;
        border: none;
        border-bottom: 2px solid #3aa373;
        text-align: center;
      }
    }
  }
</style>