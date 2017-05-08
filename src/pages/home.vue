<template>
  <div>
    <img src="../assets/logo.png">
    <h1>Home</h1>
  </div>
</template>

<script>

  export default {
    mounted() {
      setTimeout(() => {
        this.$router.push({ name: 'list'})
      }, 2000);
    }
  }

</script>